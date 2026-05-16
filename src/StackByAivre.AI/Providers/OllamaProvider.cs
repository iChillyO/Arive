using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using StackByAivre.Shared.Domain.Enums;
using StackByAivre.Shared.Domain.Interfaces;

namespace StackByAivre.AI.Providers;

public class OllamaProvider : IAiService
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;

    public AiProvider Provider => AiProvider.Ollama;

    public OllamaProvider(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _baseUrl = configuration["AiProviders:OllamaBaseUrl"] ?? "http://localhost:11434";
        _httpClient.BaseAddress = new Uri(_baseUrl.TrimEnd('/') + "/");
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

        using var request = new HttpRequestMessage(HttpMethod.Post, "api/chat")
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

            string? parsedToken = null;
            bool isDone = false;

            try
            {
                var chunk = JsonDocument.Parse(line);

                if (chunk.RootElement.TryGetProperty("done", out var doneToken) &&
                    doneToken.GetBoolean())
                {
                    isDone = true;
                }
                else if (chunk.RootElement.TryGetProperty("message", out var message) &&
                    message.TryGetProperty("content", out var contentToken))
                {
                    parsedToken = contentToken.GetString();
                }
            }
            catch (JsonException)
            {
                // Skip malformed lines
            }

            if (isDone)
                yield break;

            if (!string.IsNullOrEmpty(parsedToken))
                yield return parsedToken;
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

        var response = await _httpClient.PostAsync("api/chat", content, cancellationToken);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
        var doc = JsonDocument.Parse(responseJson);
        return doc.RootElement
            .GetProperty("message")
            .GetProperty("content")
            .GetString() ?? string.Empty;
    }
}
