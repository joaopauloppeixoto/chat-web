using ChatWeb.API.Extensions;
using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using System.Security.Cryptography;

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

    public async Task RegisterAsync(NewAccountViewModel account)
    {
        await _repository.RegisterAsync(account.ToDomainModel());
    }

    public async Task<AccountViewModel> GetAccountInfoAsync(string email)
    {
        var account = await _repository.SearchByEmailAsync(email);

        return account.ToViewModel();
    }

    public async Task UpdateLastLoginAsync(string email)
    {
        await _repository.UpdateLastLoginAsync(email);
    }

    public async Task<Account> ValidateLoginAsync(CredentialsViewModel credentials)
    {
        await _repository.ValidateLoginAsync(credentials.Email, SHA512.Create().GenerateHash(credentials.Password));

        return await _repository.SearchByEmailAsync(credentials.Email);
    }
}
