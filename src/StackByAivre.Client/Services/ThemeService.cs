using System.Windows;
using System.Windows.Media;
using CommunityToolkit.Mvvm.ComponentModel;
using StackByAivre.Shared.Domain.Enums;

using AppThemeMode = StackByAivre.Shared.Domain.Enums.ThemeMode;

namespace StackByAivre.Client.Services;

public partial class ThemeService : ObservableObject
{
    [ObservableProperty]
    private AppThemeMode _currentTheme = AppThemeMode.Dark;

    [ObservableProperty]
    private string _accentColorHex = "#6366f1";

    [ObservableProperty]
    private Color _accentColor = (Color)ColorConverter.ConvertFromString("#6366f1");

    [ObservableProperty]
    private string? _wallpaperPath;

    public void SetTheme(AppThemeMode theme)
    {
        CurrentTheme = theme;
        ApplyTheme();
    }

    public void SetAccentColor(string hex)
    {
        AccentColorHex = hex;
        AccentColor = (Color)ColorConverter.ConvertFromString(hex);
        ApplyAccentColor();
    }

    public void SetWallpaper(string? path)
    {
        WallpaperPath = path;
    }

    private void ApplyTheme()
    {
        var app = Application.Current;
        if (app == null) return;

        var uri = CurrentTheme switch
        {
            AppThemeMode.Light => new Uri("/Themes/LightTheme.xaml", UriKind.Relative),
            _ => new Uri("/Themes/DarkTheme.xaml", UriKind.Relative)
        };

        var dict = new ResourceDictionary { Source = uri };

        if (app.Resources.MergedDictionaries.Count > 0)
            app.Resources.MergedDictionaries[0] = dict;
    }

    private void ApplyAccentColor()
    {
        var app = Application.Current;
        if (app == null) return;

        app.Resources["AccentBrush"] = new SolidColorBrush(AccentColor);
        app.Resources["AccentColorValue"] = AccentColor;
        app.Resources["AccentGlowBrush"] = new SolidColorBrush(
            Color.FromArgb(77, AccentColor.R, AccentColor.G, AccentColor.B));
    }
}
