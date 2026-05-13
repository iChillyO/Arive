using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Shared.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? Gender { get; set; }
    public DateTime? Birthdate { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public ThemeMode Theme { get; set; } = ThemeMode.Dark;
    public string AccentColor { get; set; } = "#6366f1";
    public string? WallpaperPath { get; set; }
    public AiModel DefaultAiModel { get; set; } = AiModel.Gpt4o;
    public VoiceModel DefaultVoiceModel { get; set; } = VoiceModel.Alloy;
    public bool VoiceEnabled { get; set; }
    public bool SpotifyConnected { get; set; }

    // Navigation properties
    public ICollection<Conversation> Conversations { get; set; } = new List<Conversation>();
    public ICollection<WidgetConfig> Widgets { get; set; } = new List<WidgetConfig>();
}
