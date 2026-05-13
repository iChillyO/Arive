using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackByAivre.Server.Infrastructure.Data;
using StackByAivre.Server.Services;
using StackByAivre.Shared.Domain.Entities;

namespace StackByAivre.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthController(AppDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest(new { message = "Email already registered" });

        if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest(new { message = "Username already taken" });

        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = dto.Username,
            DisplayName = dto.DisplayName ?? dto.Username,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        return Ok(new AuthResponseDto(
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            UserId: user.Id,
            Username: user.Username,
            DisplayName: user.DisplayName,
            Email: user.Email));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password" });

        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        return Ok(new AuthResponseDto(
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            UserId: user.Id,
            Username: user.Username,
            DisplayName: user.DisplayName,
            Email: user.Email));
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponseDto>> Refresh([FromBody] RefreshDto dto)
    {
        var principal = _tokenService.ValidateToken(dto.AccessToken);
        if (principal is null)
            return Unauthorized(new { message = "Invalid token" });

        var userIdClaim = principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        if (userIdClaim is null || !Guid.TryParse(userIdClaim.Value, out var userId))
            return Unauthorized(new { message = "Invalid token claims" });

        var user = await _context.Users.FindAsync(userId);
        if (user is null)
            return Unauthorized(new { message = "User not found" });

        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        return Ok(new AuthResponseDto(
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            UserId: user.Id,
            Username: user.Username,
            DisplayName: user.DisplayName,
            Email: user.Email));
    }

    [HttpPost("google-signin")]
    public async Task<ActionResult<AuthResponseDto>> GoogleSignIn([FromBody] GoogleSignInDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user is null)
        {
            user = new User
            {
                Id = Guid.NewGuid(),
                Username = dto.Email.Split('@')[0] + "_" + Guid.NewGuid().ToString()[..6],
                DisplayName = dto.DisplayName ?? dto.Email.Split('@')[0],
                Email = dto.Email,
                PasswordHash = string.Empty, // No password for OAuth users
                AvatarUrl = dto.AvatarUrl,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken();

        return Ok(new AuthResponseDto(
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            UserId: user.Id,
            Username: user.Username,
            DisplayName: user.DisplayName,
            Email: user.Email));
    }
}

// DTOs
public record RegisterDto(
    [Required] string Username,
    [Required][EmailAddress] string Email,
    [Required][MinLength(6)] string Password,
    string? DisplayName);

public record LoginDto(
    [Required][EmailAddress] string Email,
    [Required] string Password);

public record RefreshDto(
    [Required] string AccessToken,
    [Required] string RefreshToken);

public record GoogleSignInDto(
    [Required] string Email,
    string? DisplayName,
    string? AvatarUrl,
    string? GoogleId);

public record AuthResponseDto(
    string AccessToken,
    string RefreshToken,
    Guid UserId,
    string Username,
    string DisplayName,
    string Email);
