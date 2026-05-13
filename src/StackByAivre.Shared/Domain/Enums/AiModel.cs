namespace StackByAivre.Shared.Domain.Enums;

public enum AiModel
{
    Gpt4o,
    Gpt4,
    Gpt35Turbo,
    ClaudeSonnet,
    ClaudeHaiku,
    ClaudeOpus,
    GeminiPro,
    GeminiFlash,
    DeepSeekChat,
    DeepSeekCoder,
    MistralLarge,
    MistralSmall,
    OllamaLocal
}

public static class AiModelExtensions
{
    public static string ToApiIdentifier(this AiModel model) => model switch
    {
        AiModel.Gpt4o => "gpt-4o",
        AiModel.Gpt4 => "gpt-4",
        AiModel.Gpt35Turbo => "gpt-3.5-turbo",
        AiModel.ClaudeSonnet => "claude-3-5-sonnet-20241022",
        AiModel.ClaudeHaiku => "claude-3-5-haiku-20241022",
        AiModel.ClaudeOpus => "claude-3-opus-20240229",
        AiModel.GeminiPro => "gemini-pro",
        AiModel.GeminiFlash => "gemini-2.0-flash",
        AiModel.DeepSeekChat => "deepseek-chat",
        AiModel.DeepSeekCoder => "deepseek-coder",
        AiModel.MistralLarge => "mistral-large-latest",
        AiModel.MistralSmall => "mistral-small-latest",
        AiModel.OllamaLocal => "llama3",
        _ => throw new ArgumentOutOfRangeException(nameof(model), model, "Unknown AI model")
    };

    public static AiProvider GetProvider(this AiModel model) => model switch
    {
        AiModel.Gpt4o => AiProvider.OpenAI,
        AiModel.Gpt4 => AiProvider.OpenAI,
        AiModel.Gpt35Turbo => AiProvider.OpenAI,
        AiModel.ClaudeSonnet => AiProvider.Anthropic,
        AiModel.ClaudeHaiku => AiProvider.Anthropic,
        AiModel.ClaudeOpus => AiProvider.Anthropic,
        AiModel.GeminiPro => AiProvider.Google,
        AiModel.GeminiFlash => AiProvider.Google,
        AiModel.DeepSeekChat => AiProvider.DeepSeek,
        AiModel.DeepSeekCoder => AiProvider.DeepSeek,
        AiModel.MistralLarge => AiProvider.Mistral,
        AiModel.MistralSmall => AiProvider.Mistral,
        AiModel.OllamaLocal => AiProvider.Ollama,
        _ => throw new ArgumentOutOfRangeException(nameof(model), model, "Unknown AI model")
    };

    public static string GetDisplayName(this AiModel model) => model switch
    {
        AiModel.Gpt4o => "GPT-4o",
        AiModel.Gpt4 => "GPT-4",
        AiModel.Gpt35Turbo => "GPT-3.5 Turbo",
        AiModel.ClaudeSonnet => "Claude Sonnet",
        AiModel.ClaudeHaiku => "Claude Haiku",
        AiModel.ClaudeOpus => "Claude Opus",
        AiModel.GeminiPro => "Gemini Pro",
        AiModel.GeminiFlash => "Gemini Flash",
        AiModel.DeepSeekChat => "DeepSeek Chat",
        AiModel.DeepSeekCoder => "DeepSeek Coder",
        AiModel.MistralLarge => "Mistral Large",
        AiModel.MistralSmall => "Mistral Small",
        AiModel.OllamaLocal => "Ollama Local",
        _ => throw new ArgumentOutOfRangeException(nameof(model), model, "Unknown AI model")
    };
}
