using CommunityToolkit.Mvvm.ComponentModel;

namespace StackByAivre.Client.Services;

public partial class NavigationService : ObservableObject
{
    [ObservableProperty]
    private string _currentView = "Login";

    [ObservableProperty]
    private object? _currentViewModel;

    private readonly Stack<string> _history = new();

    public void NavigateTo(string view, object? viewModel = null)
    {
        _history.Push(CurrentView);
        CurrentView = view;
        CurrentViewModel = viewModel;
    }

    public void GoBack()
    {
        if (_history.Count > 0)
        {
            CurrentView = _history.Pop();
            CurrentViewModel = null;
        }
    }

    public bool CanGoBack => _history.Count > 0;
}
