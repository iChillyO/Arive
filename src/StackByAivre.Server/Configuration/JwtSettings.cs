namespace StackByAivre.Server.Configuration;

public class JwtSettings
{
    public const string SectionName = "Jwt";

    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int AccessTokenExpirationMinutes { get; set; } = 60;
    public int RefreshTokenExpirationDays { get; set; } = 30;
}

public class GoogleAuthSettings
{
    public const string SectionName = "GoogleAuth";

    public string ClientId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
}

public class SpotifySettings
{
    public const string SectionName = "Spotify";

    public string ClientId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
    public string RedirectUri { get; set; } = string.Empty;
}

public class AiProviderSettings
{
    public const string SectionName = "AiProviders";

    public string OpenAiApiKey { get; set; } = string.Empty;
    public string AnthropicApiKey { get; set; } = string.Empty;
    public string GoogleAiApiKey { get; set; } = string.Empty;
    public string DeepSeekApiKey { get; set; } = string.Empty;
    public string MistralApiKey { get; set; } = string.Empty;
    public string OllamaBaseUrl { get; set; } = "http://localhost:11434";
}
