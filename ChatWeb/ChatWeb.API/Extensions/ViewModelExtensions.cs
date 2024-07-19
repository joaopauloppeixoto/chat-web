using ChatWeb.API.ViewModels;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using System.Security.Cryptography;

namespace ChatWeb.API.Extensions;

public static class ViewModelExtensions
{
    public static Account ToDomainModel(this NewAccountViewModel account)
    {
        return new Account()
        {
            Name = account.Name,
            Surname = account.Surname,
            Email = account.Email,
            PasswordHash = SHA512.Create().GenerateHash(account.Password)
        };
    }
}
