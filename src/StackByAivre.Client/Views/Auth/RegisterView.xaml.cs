using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Microsoft.Extensions.DependencyInjection;
using StackByAivre.Client.Services;
using StackByAivre.Client.ViewModels;

namespace StackByAivre.Client.Views.Auth;

public partial class RegisterView : UserControl
{
    private readonly ApiClientService _api;
    private readonly NavigationService _navigation;

    public RegisterView()
    {
        InitializeComponent();
        _api = App.Services.GetRequiredService<ApiClientService>();
        _navigation = App.Services.GetRequiredService<NavigationService>();
    }

    private async void RegisterButton_Click(object sender, RoutedEventArgs e)
    {
        var username = UsernameInput.Text.Trim();
        var displayName = DisplayNameInput.Text.Trim();
        var email = EmailInput.Text.Trim();
        var password = PasswordInput.Password;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            ShowError("Please fill in all required fields");
            return;
        }

        RegisterButton.IsEnabled = false;
        try
        {
            var result = await _api.PostAsync<AuthResponse>("api/auth/register", new
            {
                Username = username,
                DisplayName = string.IsNullOrEmpty(displayName) ? username : displayName,
                Email = email,
                Password = password,
                Gender = (GenderInput.SelectedItem as ComboBoxItem)?.Content?.ToString(),
                Birthdate = BirthdateInput.SelectedDate
            });

            if (result != null)
            {
                _api.SetToken(result.AccessToken);
                _navigation.NavigateTo("Workspace");
            }
        }
        catch
        {
            ShowError("Registration failed. Email or username may be taken.");
        }
        finally
        {
            RegisterButton.IsEnabled = true;
        }
    }

    private void LoginLink_Click(object sender, MouseButtonEventArgs e)
    {
        _navigation.NavigateTo("Login");
    }

    private void ShowError(string msg)
    {
        ErrorText.Text = msg;
        ErrorText.Visibility = Visibility.Visible;
    }
}
