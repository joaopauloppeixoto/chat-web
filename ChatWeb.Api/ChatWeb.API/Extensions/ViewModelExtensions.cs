﻿using ChatWeb.API.ViewModels;
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
            LastSeenAt = account.LastSeenAt,
            Image = account.Image
        };
    }

    public static Message ToDomainModel(this NewMessageViewModel message, Guid senderId)
    {
        return new Message()
        {
            Content = message.Content,
            SenderId = senderId,
            GroupId = message.GroupId,
        };
    }

    public static MessageViewModel ToViewModel(this Message message)
    {
        return new MessageViewModel()
        {
            Content = message.Content,
            SentDate = message.CreationDate,
            SenderId = message.SenderId
        };
    }

    public static GroupViewModel ToViewModel(this Group group, Guid? userId = null)
    {
        if (!group.IsOneOnOne)
        {
            return new GroupViewModel()
            {
                Id = group.Id,
                Name = group.Name,
                Description = group.Description,
                Image = ""
            };
        }
        else
        {
            var otherUser = group.Participants.FirstOrDefault(p => p.AccountId != userId);

            return new GroupViewModel()
            {
                Id = group.Id,
                Name = otherUser.Account?.Name,
                Description = otherUser.Account?.Email,
                Image = "",
                ChatWithId = otherUser.Account?.Id
            };
        }
    }
}
