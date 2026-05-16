using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using StackByAivre.Shared.Domain.Enums;
using StackByAivre.Shared.Domain.Interfaces;

namespace StackByAivre.AI.Providers;

public class GeminiProvider : IAiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public AiProvider Provider => AiProvider.Google;

    public GeminiProvider(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["AiProviders:GoogleAiApiKey"] ?? string.Empty;
        _httpClient.BaseAddress = new Uri("https://generativelanguage.googleapis.com/");
    }

    public async IAsyncEnumerable<string> StreamCompletionAsync(
        IEnumerable<ChatMessage> messages,
        AiModel model,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var messageList = messages.ToList();

        // Extract system instruction
        var systemMessage = messageList
            .FirstOrDefault(m => m.Role == MessageRole.System)?.Content;

        // Build contents array (Gemini uses "user" and "model" roles)
        var contents = messageList
            .Where(m => m.Role != MessageRole.System)
            .Select(m => new
            {
                role = m.Role == MessageRole.Assistant ? "model" : "user",
                parts = new[] { new { text = m.Content } }
            })
            .ToList();

        var requestBody = new Dictionary<string, object>
        {
            ["contents"] = contents
        };

        if (!string.IsNullOrEmpty(systemMessage))
        {
            requestBody["systemInstruction"] = new
            {
                parts = new[] { new { text = systemMessage } }
            };
        }

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var modelId = model.ToApiIdentifier();
        var url = $"v1beta/models/{modelId}:streamGenerateContent?alt=sse&key={_apiKey}";

        using var request = new HttpRequestMessage(HttpMethod.Post, url)
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

            string? parsedToken = null;

            try
            {
                var chunk = JsonDocument.Parse(data);

                if (chunk.RootElement.TryGetProperty("candidates", out var candidates) &&
                    candidates.GetArrayLength() > 0)
                {
                    var candidate = candidates[0];
                    if (candidate.TryGetProperty("content", out var candidateContent) &&
                        candidateContent.TryGetProperty("parts", out var parts) &&
                        parts.GetArrayLength() > 0)
                    {
                        parsedToken = parts[0].GetProperty("text").GetString();
                    }
                }
            }
            catch (JsonException)
            {
                // Skip malformed lines
            }

            if (!string.IsNullOrEmpty(parsedToken))
                yield return parsedToken;
        }
    }

    public async Task<string> GetCompletionAsync(
        IEnumerable<ChatMessage> messages,
        AiModel model,
        CancellationToken cancellationToken = default)
    {
        var messageList = messages.ToList();
        var systemMessage = messageList
            .FirstOrDefault(m => m.Role == MessageRole.System)?.Content;

        var contents = messageList
            .Where(m => m.Role != MessageRole.System)
            .Select(m => new
            {
                role = m.Role == MessageRole.Assistant ? "model" : "user",
                parts = new[] { new { text = m.Content } }
            })
            .ToList();

        var requestBody = new Dictionary<string, object>
        {
            ["contents"] = contents
        };

        if (!string.IsNullOrEmpty(systemMessage))
        {
            requestBody["systemInstruction"] = new
            {
                parts = new[] { new { text = systemMessage } }
            };
        }

        var json = JsonSerializer.Serialize(requestBody);
        var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

        var modelId = model.ToApiIdentifier();
        var url = $"v1beta/models/{modelId}:generateContent?key={_apiKey}";

        var response = await _httpClient.PostAsync(url, httpContent, cancellationToken);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
        var doc = JsonDocument.Parse(responseJson);
        return doc.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString() ?? string.Empty;
    }
}
