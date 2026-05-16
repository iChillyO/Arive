using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Threading;
using Microsoft.Extensions.DependencyInjection;
using StackByAivre.Client.Services;
using StackByAivre.Client.Views.Settings;

using AppThemeMode = StackByAivre.Shared.Domain.Enums.ThemeMode;

namespace StackByAivre.Client.Views.Workspace;

public partial class WorkspaceView : UserControl
{
    private readonly ThemeService _themeService;
    private DispatcherTimer? _voiceTimer;
    private TimeSpan _voiceElapsed = TimeSpan.Zero;

    public WorkspaceView()
    {
        InitializeComponent();
        _themeService = App.Services.GetRequiredService<ThemeService>();
        ShowDashboard();
    }

    private void Nav_Checked(object sender, RoutedEventArgs e)
    {
        if (sender is RadioButton rb && rb.Tag is string tag)
        {
            WorkspaceContent.Content = tag switch
            {
                "Dashboard" => new DashboardView(),
                "Settings" => new SettingsView(),
                _ => new DashboardView()
            };
        }
    }

    private void ShowDashboard()
    {
        WorkspaceContent.Content = new DashboardView();
    }

    private void ThemeToggle_Click(object sender, RoutedEventArgs e)
    {
        var newTheme = _themeService.CurrentTheme == AppThemeMode.Dark
            ? AppThemeMode.Light
            : AppThemeMode.Dark;
        _themeService.SetTheme(newTheme);

        ThemeIcon.Text = newTheme == AppThemeMode.Dark ? "\uE708" : "\uE706";
    }

    public void ShowVoiceCall()
    {
        VoiceCallWidget.Visibility = Visibility.Visible;
        _voiceElapsed = TimeSpan.Zero;
        _voiceTimer = new DispatcherTimer { Interval = TimeSpan.FromSeconds(1) };
        _voiceTimer.Tick += (_, _) =>
        {
            _voiceElapsed = _voiceElapsed.Add(TimeSpan.FromSeconds(1));
            VoiceCallDuration.Text = _voiceElapsed.ToString(@"mm\:ss");
        };
        _voiceTimer.Start();
    }

    private void EndVoiceCall_Click(object sender, RoutedEventArgs e)
    {
        _voiceTimer?.Stop();
        VoiceCallWidget.Visibility = Visibility.Collapsed;
    }
}
