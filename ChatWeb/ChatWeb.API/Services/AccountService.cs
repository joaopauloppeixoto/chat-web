using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;

namespace ChatWeb.API.Services;

public class AccountService : IAccountService
{
    public IAccountRepository _repository { get; set; }
    public AccountService(IAccountRepository repository)
    {
        _repository = repository;
    }

    public Task DisableAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<Account> SearchByEmailAsync(string email)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Guid Id, Account account)
    {
        throw new NotImplementedException();
    }

    public Task UpdateNameAsync(Guid Id, string name, string surname)
    {
        throw new NotImplementedException();
    }

    public Task RegisterAsync(NewAccountViewModel account)
    {
        throw new NotImplementedException();
    }
}
