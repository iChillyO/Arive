using System.Windows;
using System.Windows.Controls;
using Microsoft.Extensions.DependencyInjection;
using StackByAivre.Client.ViewModels;

namespace StackByAivre.Client.Views.Voice;

public partial class VoiceView : UserControl
{
    private readonly VoiceViewModel _vm;

    public VoiceView()
    {
        InitializeComponent();
        _vm = App.Services.GetRequiredService<VoiceViewModel>();
        DataContext = _vm;

        _vm.PropertyChanged += (_, args) =>
        {
            if (args.PropertyName == nameof(VoiceViewModel.IsCallActive))
            {
                Dispatcher.Invoke(() =>
                {
                    StatusLabel.Text = _vm.IsCallActive ? "Listening..." : "Ready";
                    CallButtonText.Text = _vm.IsCallActive ? "End Call" : "Begin Call";
                    VoiceOrb.Opacity = _vm.IsCallActive ? 1.0 : 0.6;
                });
            }
            if (args.PropertyName == nameof(VoiceViewModel.CallDuration))
            {
                Dispatcher.Invoke(() => DurationLabel.Text = _vm.CallDuration.ToString(@"mm\:ss"));
            }
        };
    }

    private void CallButton_Click(object sender, RoutedEventArgs e)
    {
        if (_vm.IsCallActive)
            _vm.EndCallCommand.Execute(null);
        else
            _vm.StartCallCommand.Execute(null);
    }

    private void MuteButton_Click(object sender, RoutedEventArgs e) => _vm.ToggleMuteCommand.Execute(null);
    private void SpeakerButton_Click(object sender, RoutedEventArgs e) => _vm.ToggleSpeakerCommand.Execute(null);
}
