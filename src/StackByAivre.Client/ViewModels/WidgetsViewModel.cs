using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Client.ViewModels;

public partial class WidgetsViewModel : ObservableObject
{
    public ObservableCollection<WidgetItem> ActiveWidgets { get; } = new()
    {
        new(Guid.NewGuid(), WidgetType.Clock, "Clock", 200, 180),
        new(Guid.NewGuid(), WidgetType.Spotify, "Spotify", 300, 320),
        new(Guid.NewGuid(), WidgetType.Timer, "Timer", 220, 220),
        new(Guid.NewGuid(), WidgetType.Notes, "Notes", 280, 240),
    };

    public ObservableCollection<WidgetType> AvailableWidgetTypes { get; } = new(Enum.GetValues<WidgetType>());

    [RelayCommand]
    private void AddWidget(WidgetType type)
    {
        ActiveWidgets.Add(new WidgetItem(Guid.NewGuid(), type, type.ToString(), 220, 220));
    }

    [RelayCommand]
    private void RemoveWidget(Guid id)
    {
        var widget = ActiveWidgets.FirstOrDefault(w => w.Id == id);
        if (widget != null) ActiveWidgets.Remove(widget);
    }
}

public record WidgetItem(Guid Id, WidgetType Type, string Title, double Width, double Height);
