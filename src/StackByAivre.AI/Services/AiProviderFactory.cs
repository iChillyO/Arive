using StackByAivre.AI.Providers;
using StackByAivre.Shared.Domain.Enums;
using StackByAivre.Shared.Domain.Interfaces;

namespace StackByAivre.AI.Services;

public class AiProviderFactory : IAiProviderFactory
{
    private readonly Dictionary<AiProvider, IAiService> _providers;

    public AiProviderFactory(
        OpenAiProvider openAiProvider,
        AnthropicProvider anthropicProvider,
        GeminiProvider geminiProvider,
        DeepSeekProvider deepSeekProvider,
        MistralProvider mistralProvider,
        OllamaProvider ollamaProvider)
    {
        _providers = new Dictionary<AiProvider, IAiService>
        {
            [AiProvider.OpenAI] = openAiProvider,
            [AiProvider.Anthropic] = anthropicProvider,
            [AiProvider.Google] = geminiProvider,
            [AiProvider.DeepSeek] = deepSeekProvider,
            [AiProvider.Mistral] = mistralProvider,
            [AiProvider.Ollama] = ollamaProvider
        };
    }

    public IAiService GetProvider(AiProvider provider)
    {
        if (_providers.TryGetValue(provider, out var service))
            return service;

        throw new ArgumentException($"AI provider '{provider}' is not registered.", nameof(provider));
    }

    public IAiService GetProviderForModel(AiModel model)
    {
        var provider = model.GetProvider();
        return GetProvider(provider);
    }
}
