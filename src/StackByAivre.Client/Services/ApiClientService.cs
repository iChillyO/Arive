using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.IO;

namespace StackByAivre.Client.Services;

public class ApiClientService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private string? _accessToken;

    public ApiClientService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public void SetToken(string token) => _accessToken = token;
    public void ClearToken() => _accessToken = null;
    public bool IsAuthenticated => !string.IsNullOrEmpty(_accessToken);

    private HttpClient CreateClient()
    {
        var client = _httpClientFactory.CreateClient("StackApi");
        if (!string.IsNullOrEmpty(_accessToken))
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _accessToken);
        return client;
    }

    public async Task<T?> GetAsync<T>(string endpoint)
    {
        var client = CreateClient();
        var response = await client.GetAsync(endpoint);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<T>();
    }

    public async Task<T?> PostAsync<T>(string endpoint, object body)
    {
        var client = CreateClient();
        var response = await client.PostAsJsonAsync(endpoint, body);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<T>();
    }

    public async Task DeleteAsync(string endpoint)
    {
        var client = CreateClient();
        var response = await client.DeleteAsync(endpoint);
        response.EnsureSuccessStatusCode();
    }

    /// <summary>
    /// Streams SSE responses from the server, yielding each token as it arrives.
    /// </summary>
    public async IAsyncEnumerable<string> StreamAsync(string endpoint, object body)
    {
        var client = CreateClient();
        var request = new HttpRequestMessage(HttpMethod.Post, endpoint)
        {
            Content = JsonContent.Create(body)
        };

        var response = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
        response.EnsureSuccessStatusCode();

        using var stream = await response.Content.ReadAsStreamAsync();
        using var reader = new StreamReader(stream);

        while (!reader.EndOfStream)
        {
            var line = await reader.ReadLineAsync();
            if (string.IsNullOrEmpty(line)) continue;

            if (line.StartsWith("data: "))
            {
                var data = line[6..];
                if (data == "[DONE]") yield break;
                yield return data;
            }
        }
    }
}
