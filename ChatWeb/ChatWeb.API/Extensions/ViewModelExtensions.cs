using ChatWeb.API.ViewModels;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;
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

    public static AccountViewModel ToViewModel(this Account account)
    {
        return new AccountViewModel()
        {
            Id = account.Id,
            Name = account.Name,
            Surname = account.Surname,
            Email = account.Email,
            CreatedAt = account.CreatedAt,
        };
    }

    public static Message ToDomainModel(this NewMessageViewModel message, Guid senderId)
    {
        return new Message()
        {
            Content = message.Content,
            ReceiverId = message.ReceiverId,
            SenderId = senderId
        };
    }

    public static MessageViewModel ToViewModel(this Message message)
    {
        return new MessageViewModel()
        {
            Content = message.Content,
            SentDate = message.CreationDate
        };
    }
}
