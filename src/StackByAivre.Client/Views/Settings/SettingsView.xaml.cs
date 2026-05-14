using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Shapes;
using Microsoft.Extensions.DependencyInjection;
using StackByAivre.Client.Services;
using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Client.Views.Settings;

public partial class SettingsView : UserControl
{
    private readonly ThemeService _themeService;

    public SettingsView()
    {
        InitializeComponent();
        _themeService = App.Services.GetRequiredService<ThemeService>();
    }

    private void DarkTheme_Checked(object sender, RoutedEventArgs e)
    {
        _themeService.SetTheme(ThemeMode.Dark);
    }

    private void LightTheme_Checked(object sender, RoutedEventArgs e)
    {
        _themeService.SetTheme(ThemeMode.Light);
    }

    private void AccentColor_Click(object sender, MouseButtonEventArgs e)
    {
        if (sender is Ellipse ellipse && ellipse.Tag is string hex)
        {
            _themeService.SetAccentColor(hex);
        }
    }
}
