namespace StackByAivre.Shared.Domain.Interfaces;

public interface ISecureStorage
{
    Task SaveAsync(string key, string value);
    Task<string?> GetAsync(string key);
    Task DeleteAsync(string key);
    Task ClearAllAsync();
}
