using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StackByAivre.Client.Services;

namespace StackByAivre.Client.ViewModels;

public partial class RegisterViewModel : ObservableObject
{
    private readonly ApiClientService _api;
    private readonly NavigationService _navigation;

    [ObservableProperty] private string _username = string.Empty;
    [ObservableProperty] private string _displayName = string.Empty;
    [ObservableProperty] private string _email = string.Empty;
    [ObservableProperty] private string _password = string.Empty;
    [ObservableProperty] private string? _gender;
    [ObservableProperty] private DateTime? _birthdate;
    [ObservableProperty] private string? _error;
    [ObservableProperty] private bool _isLoading;

    public RegisterViewModel(ApiClientService api, NavigationService navigation)
    {
        _api = api;
        _navigation = navigation;
    }

    [RelayCommand]
    private async Task RegisterAsync()
    {
        if (string.IsNullOrWhiteSpace(Username) || string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Password))
        {
            Error = "Please fill in all required fields";
            return;
        }

        IsLoading = true;
        Error = null;

        try
        {
            var result = await _api.PostAsync<AuthResponse>("api/auth/register", new
            {
                Username, DisplayName, Email, Password, Gender, Birthdate
            });

            if (result != null)
            {
                _api.SetToken(result.AccessToken);
                _navigation.NavigateTo("Workspace");
            }
        }
        catch
        {
            Error = "Registration failed. Email or username may be taken.";
        }
        finally
        {
            IsLoading = false;
        }
    }

    [RelayCommand]
    private void GoToLogin() => _navigation.NavigateTo("Login");
}
