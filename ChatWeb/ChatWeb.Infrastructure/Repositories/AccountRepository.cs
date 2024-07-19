using ChatWeb.Domain.AggregatesModel.AccountAggregate;

namespace ChatWeb.Infrastructure.Repositories;

public class AccountRepository : IAccountRepository
{
    public Task DisableAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task RegisterAsync(Account account)
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
}
