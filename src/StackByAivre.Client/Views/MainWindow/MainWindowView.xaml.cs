using System.Windows;
using System.Windows.Input;
using Microsoft.Extensions.DependencyInjection;
using StackByAivre.Client.Services;
using StackByAivre.Client.Views.Auth;
using StackByAivre.Client.Views.Workspace;

namespace StackByAivre.Client.Views.MainWindow;

public partial class MainWindowView : Window
{
    private readonly NavigationService _navigation;

    public MainWindowView()
    {
        InitializeComponent();
        _navigation = App.Services.GetRequiredService<NavigationService>();
        _navigation.PropertyChanged += (_, args) =>
        {
            if (args.PropertyName == nameof(NavigationService.CurrentView))
                UpdateView();
        };
        UpdateView();
    }

    private void UpdateView()
    {
        MainContent.Content = _navigation.CurrentView switch
        {
            "Login" => new LoginView(),
            "Register" => new RegisterView(),
            "Workspace" => new WorkspaceView(),
            _ => new LoginView()
        };
    }

    // --- Title bar interactions ---

    private void TitleBar_MouseDown(object sender, MouseButtonEventArgs e)
    {
        if (e.ClickCount == 2)
            MaximizeRestore();
        else if (e.LeftButton == MouseButtonState.Pressed)
            DragMove();
    }

    private void TitleBar_MouseUp(object sender, MouseButtonEventArgs e) { }

    private void CloseButton_Click(object sender, MouseButtonEventArgs e) => Close();

    private void MinimizeButton_Click(object sender, MouseButtonEventArgs e) =>
        WindowState = WindowState.Minimized;

    private void MaximizeButton_Click(object sender, MouseButtonEventArgs e) => MaximizeRestore();

    private void MaximizeRestore()
    {
        WindowState = WindowState == WindowState.Maximized
            ? WindowState.Normal
            : WindowState.Maximized;
    }
}
