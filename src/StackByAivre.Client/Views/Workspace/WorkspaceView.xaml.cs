using System.Windows;
using System.Windows.Controls;
using StackByAivre.Client.Views.Chat;
using StackByAivre.Client.Views.Settings;
using StackByAivre.Client.Views.Voice;

namespace StackByAivre.Client.Views.Workspace;

public partial class WorkspaceView : UserControl
{
    public WorkspaceView()
    {
        InitializeComponent();
        ShowDashboard();
    }

    private void Nav_Checked(object sender, RoutedEventArgs e)
    {
        if (sender is RadioButton rb && rb.Tag is string tag)
        {
            WorkspaceContent.Content = tag switch
            {
                "Dashboard" => new DashboardView(),
                "Chat" => new ChatView(),
                "Coder" => new ChatView(),
                "Image" => new ChatView(),
                "Voice" => new VoiceView(),
                "Research" => new ChatView(),
                "Settings" => new SettingsView(),
                _ => new DashboardView()
            };
        }
    }

    private void ShowDashboard()
    {
        WorkspaceContent.Content = new DashboardView();
    }
}
