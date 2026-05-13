using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Shared.Domain.Events;

public record MessageReceivedEvent(Guid ConversationId, Guid MessageId, MessageRole Role, string Content);

public record StreamTokenReceivedEvent(Guid ConversationId, string Token);

public record StreamCompletedEvent(Guid ConversationId, string FullContent, int TokenCount);

public record ConversationCreatedEvent(Guid ConversationId, Guid UserId, AgentType AgentType, AiModel Model);

public record VoiceCallStartedEvent(Guid UserId, VoiceModel Voice);

public record VoiceCallEndedEvent(Guid UserId, TimeSpan Duration);

public record ThemeChangedEvent(Guid UserId, ThemeMode NewTheme);

public record WidgetAddedEvent(Guid UserId, Guid WidgetId, WidgetType Type);

public record WidgetRemovedEvent(Guid UserId, Guid WidgetId, WidgetType Type);

public record SpotifyPlaybackChangedEvent(Guid UserId, bool IsPlaying, string? TrackName);

public record AuthStateChangedEvent(Guid? UserId, bool IsAuthenticated);
