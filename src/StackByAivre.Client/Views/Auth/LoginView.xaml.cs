using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Microsoft.Extensions.DependencyInjection;
using StackByAivre.Client.Services;
using StackByAivre.Client.ViewModels;

namespace StackByAivre.Client.Views.Auth;

public partial class LoginView : UserControl
{
    private readonly ApiClientService _api;
    private readonly NavigationService _navigation;

    public LoginView()
    {
        InitializeComponent();
        _api = App.Services.GetRequiredService<ApiClientService>();
        _navigation = App.Services.GetRequiredService<NavigationService>();
    }

    private async void LoginButton_Click(object sender, RoutedEventArgs e)
    {
        var email = EmailInput.Text.Trim();
        var password = PasswordInput.Password;

        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            ShowError("Please enter email and password");
            return;
        }

        LoginButton.IsEnabled = false;
        try
        {
            var result = await _api.PostAsync<AuthResponse>("api/auth/login",
                new { Email = email, Password = password });

            if (result != null)
            {
                _api.SetToken(result.AccessToken);
                _navigation.NavigateTo("Workspace");
            }
        }
        catch
        {
            ShowError("Invalid credentials");
        }
        finally
        {
            LoginButton.IsEnabled = true;
        }
    }

    private void RegisterLink_Click(object sender, MouseButtonEventArgs e)
    {
        _navigation.NavigateTo("Register");
    }

    private void ShowError(string message)
    {
        ErrorText.Text = message;
        ErrorText.Visibility = Visibility.Visible;
    }
}
