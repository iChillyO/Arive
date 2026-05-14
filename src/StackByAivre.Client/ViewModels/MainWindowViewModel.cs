using CommunityToolkit.Mvvm.ComponentModel;
using StackByAivre.Client.Services;

namespace StackByAivre.Client.ViewModels;

public partial class MainWindowViewModel : ObservableObject
{
    private readonly NavigationService _navigation;
    private readonly ThemeService _themeService;

    [ObservableProperty]
    private string _currentView = "Login";

    public MainWindowViewModel(NavigationService navigation, ThemeService themeService)
    {
        _navigation = navigation;
        _themeService = themeService;

        _navigation.PropertyChanged += (_, args) =>
        {
            if (args.PropertyName == nameof(NavigationService.CurrentView))
                CurrentView = _navigation.CurrentView;
        };
    }
}
