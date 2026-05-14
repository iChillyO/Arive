using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Microsoft.Extensions.DependencyInjection;
using StackByAivre.Client.ViewModels;

namespace StackByAivre.Client.Views.Chat;

public partial class ChatView : UserControl
{
    private readonly ChatViewModel _vm;

    public ChatView()
    {
        InitializeComponent();
        _vm = App.Services.GetRequiredService<ChatViewModel>();
        DataContext = _vm;
        MessagesList.ItemsSource = _vm.Messages;
        Loaded += async (_, _) => await _vm.InitializeAsync();
    }

    private async void SendButton_Click(object sender, RoutedEventArgs e) => await SendMessage();

    private async void InputBox_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.Key == Key.Enter && !Keyboard.Modifiers.HasFlag(ModifierKeys.Shift))
        {
            e.Handled = true;
            await SendMessage();
        }
    }

    private async Task SendMessage()
    {
        if (string.IsNullOrWhiteSpace(InputBox.Text)) return;
        _vm.InputText = InputBox.Text;
        InputBox.Text = string.Empty;
        EmptyState.Visibility = Visibility.Collapsed;
        await _vm.SendMessageCommand.ExecuteAsync(null);
        MessageCount.Text = $"{_vm.Messages.Count} messages";
        MessagesScroll.ScrollToEnd();
    }
}
