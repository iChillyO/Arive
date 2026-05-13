namespace StackByAivre.Shared.Domain.Interfaces;

public record SpotifyPlaybackState(
    string TrackName,
    string ArtistName,
    string AlbumName,
    string? AlbumArtUrl,
    bool IsPlaying,
    int ProgressMs,
    int DurationMs);

public record SpotifyPlaylist(
    string Id,
    string Name,
    string? Description,
    string? ImageUrl,
    int TrackCount);

public interface ISpotifyService
{
    Task<string> GetAuthorizationUrlAsync();
    Task ExchangeCodeAsync(string code);
    Task<SpotifyPlaybackState?> GetCurrentPlaybackAsync();
    Task PlayAsync(string? contextUri = null);
    Task PauseAsync();
    Task NextTrackAsync();
    Task PreviousTrackAsync();
    Task<IReadOnlyList<SpotifyPlaylist>> GetPlaylistsAsync();
    bool IsConnected { get; }
}
