using ChatWeb.API.Extensions;
using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;

namespace ChatWeb.API.Services;

public class MessageService : IMessageService
{
    public IMessageRepository _repository { get; set; }
    public MessageService(IMessageRepository repository)
    {
        _repository = repository;
    }

    public Task DisableAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task EditAsync(Guid id, Message message)
    {
        throw new NotImplementedException();
    }

    public Task<IList<ChatViewModel>> GetChatListAsync(string userEmail)
    {
        throw new NotImplementedException();
    }

    public async Task SendAsync(NewMessageViewModel message, Guid senderId)
    {
        await _repository.AddAsync(
            message.ToDomainModel(senderId)
        );
    }

    public async Task<IList<MessageViewModel>> GetMessages(Guid userId, Guid targetId)
    {
        return (await _repository.GetMessages(userId, targetId))
            .Select(m => m.ToViewModel())
            .ToList();
    }
}
