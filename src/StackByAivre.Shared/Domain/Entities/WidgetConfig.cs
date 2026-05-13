using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Shared.Domain.Entities;

public class WidgetConfig
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public WidgetType Type { get; set; }
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int ZIndex { get; set; }
    public string? ConfigJson { get; set; }
    public bool IsVisible { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
}
