using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Threading;

namespace StackByAivre.Client.Views.Workspace;

public partial class DashboardView : UserControl
{
    private readonly DispatcherTimer _clockTimer;
    private readonly DispatcherTimer _stopwatchTimer;
    private TimeSpan _stopwatchElapsed = TimeSpan.Zero;
    private bool _stopwatchRunning;

    public DashboardView()
    {
        InitializeComponent();

        _clockTimer = new DispatcherTimer { Interval = TimeSpan.FromSeconds(1) };
        _clockTimer.Tick += (_, _) => UpdateClock();
        _clockTimer.Start();
        UpdateClock();

        _stopwatchTimer = new DispatcherTimer { Interval = TimeSpan.FromSeconds(1) };
        _stopwatchTimer.Tick += (_, _) =>
        {
            _stopwatchElapsed = _stopwatchElapsed.Add(TimeSpan.FromSeconds(1));
            UpdateStopwatch();
        };

        UpdateGreeting();
        BuildCalendar();
    }

    private void UpdateGreeting()
    {
        var hour = DateTime.Now.Hour;
        GreetingText.Text = hour switch
        {
            >= 5 and < 12 => "Good morning,",
            >= 12 and < 17 => "Good afternoon,",
            >= 17 and < 21 => "Good evening,",
            _ => "Good night,"
        };
    }

    private void UpdateClock()
    {
        var now = DateTime.Now;
        ClockDate.Text = now.ToString("ddd, MMM d");
        ClockTime.Text = now.ToString("h:mm");
        ClockSeconds.Text = now.ToString("ss");
        ClockAmPm.Text = now.Hour >= 12 ? "PM" : "AM";
    }

    private void UpdateStopwatch()
    {
        StopwatchDisplay.Text = _stopwatchElapsed.ToString(@"hh\:mm\:ss");
    }

    private void StopwatchStart_Click(object sender, RoutedEventArgs e)
    {
        if (_stopwatchRunning)
        {
            _stopwatchTimer.Stop();
            _stopwatchRunning = false;
        }
        else
        {
            _stopwatchTimer.Start();
            _stopwatchRunning = true;
        }
    }

    private void StopwatchReset_Click(object sender, RoutedEventArgs e)
    {
        _stopwatchTimer.Stop();
        _stopwatchRunning = false;
        _stopwatchElapsed = TimeSpan.Zero;
        UpdateStopwatch();
    }

    private void BuildCalendar()
    {
        CalendarDays.Children.Clear();

        var now = DateTime.Now;
        CalendarMonth.Text = now.ToString("MMMM yyyy");

        var firstDay = new DateTime(now.Year, now.Month, 1);
        // Mon = 0, Sun = 6
        var startOffset = ((int)firstDay.DayOfWeek + 6) % 7;
        var daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);
        var prevMonthDays = DateTime.DaysInMonth(firstDay.AddMonths(-1).Year, firstDay.AddMonths(-1).Month);

        // Previous month tail (greyed)
        for (int i = startOffset - 1; i >= 0; i--)
        {
            CalendarDays.Children.Add(MakeDay((prevMonthDays - i).ToString(), isMuted: true));
        }

        // Current month
        for (int day = 1; day <= daysInMonth; day++)
        {
            var isToday = day == now.Day;
            CalendarDays.Children.Add(MakeDay(day.ToString(), isToday: isToday));
        }

        // Next month head (greyed)
        var totalCells = startOffset + daysInMonth;
        var trailing = (7 - (totalCells % 7)) % 7;
        if (totalCells <= 35) trailing += 7; // ensure 6 rows
        for (int i = 1; i <= trailing; i++)
        {
            CalendarDays.Children.Add(MakeDay(i.ToString(), isMuted: true));
        }
    }

    private FrameworkElement MakeDay(string text, bool isToday = false, bool isMuted = false)
    {
        var border = new Border
        {
            CornerRadius = new CornerRadius(12),
            Padding = new Thickness(0),
            Margin = new Thickness(2),
            Height = 32,
            HorizontalAlignment = HorizontalAlignment.Stretch,
            VerticalAlignment = VerticalAlignment.Center
        };

        if (isToday)
        {
            border.Background = (Brush)FindResource("ForegroundBrush");
        }

        var tb = new TextBlock
        {
            Text = text,
            FontSize = 12,
            HorizontalAlignment = HorizontalAlignment.Center,
            VerticalAlignment = VerticalAlignment.Center
        };

        if (isToday)
            tb.Foreground = (Brush)FindResource("BackgroundBrush");
        else if (isMuted)
            tb.Foreground = (Brush)FindResource("TertiaryTextBrush");
        else
            tb.Foreground = (Brush)FindResource("ForegroundBrush");

        border.Child = tb;
        return border;
    }
}
