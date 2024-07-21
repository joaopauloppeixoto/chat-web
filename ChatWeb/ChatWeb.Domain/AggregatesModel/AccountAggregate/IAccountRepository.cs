namespace ChatWeb.Domain.AggregatesModel.AccountAggregate;

public interface IAccountRepository
{
    public Task RegisterAsync(Account account);
    public Task UpdateAsync(Guid id, Account account);
    public Task UpdateNameAsync(Guid id, string name, string surname);
    public Task DisableAsync(Guid id);
    public Task<Account> SearchByEmailAsync(string email);
    public Task UpdateLastLoginAsync(string email);
    public Task ValidateLoginAsync(string email, string password);
}
