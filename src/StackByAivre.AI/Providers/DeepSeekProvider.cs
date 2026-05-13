using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using StackByAivre.Shared.Domain.Enums;
using StackByAivre.Shared.Domain.Interfaces;

namespace StackByAivre.AI.Providers;

public class DeepSeekProvider : IAiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public AiProvider Provider => AiProvider.DeepSeek;

    public DeepSeekProvider(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["AiProviders:DeepSeekApiKey"] ?? string.Empty;
        _httpClient.BaseAddress = new Uri("https://api.deepseek.com/");
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _apiKey);
    }

    public async IAsyncEnumerable<string> StreamCompletionAsync(
        IEnumerable<ChatMessage> messages,
        AiModel model,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var requestBody = new
        {
            model = model.ToApiIdentifier(),
            messages = messages.Select(m => new
            {
                role = m.Role.ToString().ToLower(),
                content = m.Content
            }),
            stream = true
        };

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        using var request = new HttpRequestMessage(HttpMethod.Post, "v1/chat/completions")
        {
            Content = content
        };

        using var response = await _httpClient.SendAsync(
            request, HttpCompletionOption.ResponseHeadersRead, cancellationToken);
        response.EnsureSuccessStatusCode();

        using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
        using var reader = new StreamReader(stream);

        while (!reader.EndOfStream)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var line = await reader.ReadLineAsync(cancellationToken);

            if (string.IsNullOrWhiteSpace(line))
                continue;

            if (!line.StartsWith("data: "))
                continue;

            var data = line["data: ".Length..];

            if (data == "[DONE]")
                yield break;

            var chunk = JsonDocument.Parse(data);
            var choices = chunk.RootElement.GetProperty("choices");

            if (choices.GetArrayLength() == 0)
                continue;

            var delta = choices[0].GetProperty("delta");

            if (delta.TryGetProperty("content", out var contentToken))
            {
                var token = contentToken.GetString();
                if (!string.IsNullOrEmpty(token))
                    yield return token;
            }
        }
    }

    public async Task<string> GetCompletionAsync(
        IEnumerable<ChatMessage> messages,
        AiModel model,
        CancellationToken cancellationToken = default)
    {
        var requestBody = new
        {
            model = model.ToApiIdentifier(),
            messages = messages.Select(m => new
            {
                role = m.Role.ToString().ToLower(),
                content = m.Content
            }),
            stream = false
        };

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync("v1/chat/completions", content, cancellationToken);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
        var doc = JsonDocument.Parse(responseJson);
        return doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? string.Empty;
    }
}
