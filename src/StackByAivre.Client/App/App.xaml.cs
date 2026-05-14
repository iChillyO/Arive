using System.Windows;
using Microsoft.Extensions.DependencyInjection;
using StackByAivre.Client.Services;
using StackByAivre.Client.ViewModels;
using StackByAivre.Client.Views.MainWindow;

namespace StackByAivre.Client;

public partial class App : Application
{
    public static IServiceProvider Services { get; private set; } = null!;

    private void Application_Startup(object sender, StartupEventArgs e)
    {
        var services = new ServiceCollection();
        ConfigureServices(services);
        Services = services.BuildServiceProvider();

        var mainWindow = new MainWindowView();
        mainWindow.Show();
    }

    private static void ConfigureServices(IServiceCollection services)
    {
        // HTTP client
        services.AddHttpClient("StackApi", client =>
        {
            client.BaseAddress = new Uri("http://localhost:5000/");
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        });

        // Core services
        services.AddSingleton<NavigationService>();
        services.AddSingleton<ThemeService>();
        services.AddSingleton<ApiClientService>();

        // ViewModels
        services.AddTransient<MainWindowViewModel>();
        services.AddTransient<LoginViewModel>();
        services.AddTransient<RegisterViewModel>();
        services.AddTransient<WorkspaceViewModel>();
        services.AddTransient<ChatViewModel>();
        services.AddTransient<SettingsViewModel>();
        services.AddTransient<VoiceViewModel>();
        services.AddTransient<WidgetsViewModel>();
    }
}
