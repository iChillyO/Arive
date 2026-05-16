using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StackByAivre.Client.Services;
using StackByAivre.Shared.Domain.Enums;

using AppThemeMode = StackByAivre.Shared.Domain.Enums.ThemeMode;

namespace StackByAivre.Client.ViewModels;

public partial class SettingsViewModel : ObservableObject
{
    private readonly ThemeService _themeService;

    [ObservableProperty] private AppThemeMode _selectedTheme;
    [ObservableProperty] private string _selectedAccentColor = "#6366f1";
    [ObservableProperty] private AiModel _defaultModel = AiModel.Gpt4o;
    [ObservableProperty] private bool _voiceEnabled = true;
    [ObservableProperty] private VoiceModel _selectedVoice = VoiceModel.Alloy;
    [ObservableProperty] private bool _spotifyConnected;

    public ObservableCollection<AccentColorOption> AccentColors { get; } = new()
    {
        new("#6366f1", "Indigo"),
        new("#3b82f6", "Blue"),
        new("#06b6d4", "Cyan"),
        new("#10b981", "Green"),
        new("#f59e0b", "Amber"),
        new("#f43f5e", "Rose"),
        new("#a855f7", "Purple"),
        new("#e5e5e5", "Silver"),
    };

    public SettingsViewModel(ThemeService themeService)
    {
        _themeService = themeService;
        SelectedTheme = _themeService.CurrentTheme;
        SelectedAccentColor = _themeService.AccentColorHex;
    }

    partial void OnSelectedThemeChanged(AppThemeMode value) => _themeService.SetTheme(value);
    partial void OnSelectedAccentColorChanged(string value) => _themeService.SetAccentColor(value);

    [RelayCommand]
    private void ApplyAccent(string hex)
    {
        SelectedAccentColor = hex;
    }
}

public record AccentColorOption(string Hex, string Name);
