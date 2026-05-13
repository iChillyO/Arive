using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Shared.Domain.Entities;

public class Conversation
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public AgentType AgentType { get; set; }
    public AiModel Model { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
    public ICollection<Message> Messages { get; set; } = new List<Message>();
}
