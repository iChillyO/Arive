using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using StackByAivre.Shared.Domain.Enums;
using StackByAivre.Shared.Domain.Interfaces;

namespace StackByAivre.AI.Providers;

public class AnthropicProvider : IAiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public AiProvider Provider => AiProvider.Anthropic;

    public AnthropicProvider(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["AiProviders:AnthropicApiKey"] ?? string.Empty;
        _httpClient.BaseAddress = new Uri("https://api.anthropic.com/");
        _httpClient.DefaultRequestHeaders.Add("x-api-key", _apiKey);
        _httpClient.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");
    }

    public async IAsyncEnumerable<string> StreamCompletionAsync(
        IEnumerable<ChatMessage> messages,
        AiModel model,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var messageList = messages.ToList();

        // Extract system message
        var systemMessage = messageList
            .FirstOrDefault(m => m.Role == MessageRole.System)?.Content;

        // Filter out system messages for the messages array
        var anthropicMessages = messageList
            .Where(m => m.Role != MessageRole.System)
            .Select(m => new
            {
                role = m.Role.ToString().ToLower(),
                content = m.Content
            });

        var requestBody = new Dictionary<string, object>
        {
            ["model"] = model.ToApiIdentifier(),
            ["max_tokens"] = 4096,
            ["stream"] = true,
            ["messages"] = anthropicMessages.ToList()
        };

        if (!string.IsNullOrEmpty(systemMessage))
        {
            requestBody["system"] = systemMessage;
        }

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        using var request = new HttpRequestMessage(HttpMethod.Post, "v1/messages")
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

            try
            {
                var chunk = JsonDocument.Parse(data);
                var type = chunk.RootElement.GetProperty("type").GetString();

                if (type == "content_block_delta")
                {
                    var delta = chunk.RootElement.GetProperty("delta");
                    if (delta.TryGetProperty("text", out var textToken))
                    {
                        var token = textToken.GetString();
                        if (!string.IsNullOrEmpty(token))
                            yield return token;
                    }
                }
                else if (type == "message_stop")
                {
                    yield break;
                }
            }
            catch (JsonException)
            {
                continue;
            }
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

        var anthropicMessages = messageList
            .Where(m => m.Role != MessageRole.System)
            .Select(m => new
            {
                role = m.Role.ToString().ToLower(),
                content = m.Content
            });

        var requestBody = new Dictionary<string, object>
        {
            ["model"] = model.ToApiIdentifier(),
            ["max_tokens"] = 4096,
            ["messages"] = anthropicMessages.ToList()
        };

        if (!string.IsNullOrEmpty(systemMessage))
        {
            requestBody["system"] = systemMessage;
        }

        var json = JsonSerializer.Serialize(requestBody);
        var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _httpClient.PostAsync("v1/messages", httpContent, cancellationToken);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
        var doc = JsonDocument.Parse(responseJson);
        return doc.RootElement
            .GetProperty("content")[0]
            .GetProperty("text")
            .GetString() ?? string.Empty;
    }
}
