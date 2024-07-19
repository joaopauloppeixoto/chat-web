using ChatWeb.API.ViewModels;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;

namespace ChatWeb.API.Interfaces;

public interface IAccountService
{
    public Task RegisterAsync(NewAccountViewModel account);
    public Task UpdateAsync(Guid Id, Account account);
    public Task UpdateNameAsync(Guid Id, string name, string surname);
    public Task DisableAsync(Guid id);
    public Task<Account> SearchByEmailAsync(string email);
}
