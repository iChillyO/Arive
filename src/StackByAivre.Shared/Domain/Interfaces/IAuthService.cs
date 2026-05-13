namespace StackByAivre.Shared.Domain.Interfaces;

public record AuthResult(bool Success, string? Token, string? RefreshToken, string? ErrorMessage, Guid? UserId);

public record RegisterRequest(string Username, string DisplayName, string Email, string Password);

public interface IAuthService
{
    Task<AuthResult> LoginAsync(string email, string password);
    Task<AuthResult> RegisterAsync(RegisterRequest request);
    Task<AuthResult> GoogleSignInAsync(string idToken);
    Task<AuthResult> RefreshTokenAsync(string refreshToken);
    Task LogoutAsync();
    Task<bool> IsAuthenticatedAsync();
    Guid? CurrentUserId { get; }
}
