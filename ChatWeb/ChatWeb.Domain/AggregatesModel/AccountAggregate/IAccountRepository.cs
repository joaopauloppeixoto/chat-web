﻿namespace ChatWeb.Domain.AggregatesModel.AccountAggregate;

public interface IAccountRepository
{
    public Task RegisterAsync(Account account);
    public Task UpdateAsync(Guid Id, Account account);
    public Task UpdateNameAsync(Guid Id, string name, string surname);
    public Task DisableAsync(Guid id);
    public Task<Account> SearchByEmailAsync(string email);
}