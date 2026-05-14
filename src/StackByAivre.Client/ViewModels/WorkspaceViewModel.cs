using CommunityToolkit.Mvvm.ComponentModel;
using StackByAivre.Client.Services;

namespace StackByAivre.Client.ViewModels;

public partial class WorkspaceViewModel : ObservableObject
{
    private readonly NavigationService _navigation;
    private readonly ThemeService _themeService;

    [ObservableProperty]
    private string _activeSection = "Dashboard";

    public WorkspaceViewModel(NavigationService navigation, ThemeService themeService)
    {
        _navigation = navigation;
        _themeService = themeService;
    }
}
