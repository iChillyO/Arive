using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StackByAivre.Client.Services;

namespace StackByAivre.Client.ViewModels;

public partial class LoginViewModel : ObservableObject
{
    private readonly ApiClientService _api;
    private readonly NavigationService _navigation;

    [ObservableProperty] private string _email = string.Empty;
    [ObservableProperty] private string _password = string.Empty;
    [ObservableProperty] private string? _error;
    [ObservableProperty] private bool _isLoading;

    public LoginViewModel(ApiClientService api, NavigationService navigation)
    {
        _api = api;
        _navigation = navigation;
    }

    [RelayCommand]
    private async Task LoginAsync()
    {
        if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Password))
        {
            Error = "Please enter email and password";
            return;
        }

        IsLoading = true;
        Error = null;

        try
        {
            var result = await _api.PostAsync<AuthResponse>("api/auth/login", new { Email, Password });
            if (result != null)
            {
                _api.SetToken(result.AccessToken);
                _navigation.NavigateTo("Workspace");
            }
        }
        catch
        {
            Error = "Invalid credentials";
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    private void GoToRegister() => _navigation.NavigateTo("Register");
}

public record AuthResponse(string AccessToken, string RefreshToken, string UserId);
