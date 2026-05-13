using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Shared.Domain.Entities;

public class Message
{
    public Guid Id { get; set; }
    public Guid ConversationId { get; set; }
    public MessageRole Role { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? AttachmentUrl { get; set; }
    public string? AttachmentType { get; set; }
    public int TokenCount { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation properties
    public Conversation Conversation { get; set; } = null!;
}
