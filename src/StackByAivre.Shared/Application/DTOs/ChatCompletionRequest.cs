using StackByAivre.Shared.Domain.Enums;
using StackByAivre.Shared.Domain.Interfaces;

namespace StackByAivre.Shared.Application.DTOs;

public record ChatCompletionRequest(
    Guid ConversationId,
    IReadOnlyList<ChatMessage> Messages,
    AiModel Model,
    AgentType AgentType,
    bool Stream = true);

public record ChatCompletionResponse(
    Guid ConversationId,
    Guid MessageId,
    string Content,
    AiModel Model,
    int TokenCount,
    DateTime CreatedAt);

public record ConversationDto(
    Guid Id,
    string Title,
    AgentType AgentType,
    AiModel Model,
    bool IsActive,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    int MessageCount);

public record UserProfileDto(
    Guid Id,
    string Username,
    string DisplayName,
    string Email,
    string? Gender,
    DateTime? Birthdate,
    string? AvatarUrl,
    ThemeMode Theme,
    string AccentColor,
    string? WallpaperPath,
    AiModel DefaultAiModel,
    VoiceModel DefaultVoiceModel,
    bool VoiceEnabled,
    bool SpotifyConnected);
