using ChatWeb.Domain.AggregatesModel.AccountAggregate;

namespace ChatWeb.Domain.AggregatesModel.MessengerAggregate;

public interface IMessageRepository
{
    public Task AddAsync(Message message);
    public Task UpdateAsync(Guid id, Message message);
    public Task DisableAsync(Guid id);
    public Task<IList<Message>> GetMessages(Guid groupId);
    public Task<IList<Group>> GetChatListAsync(Guid userId);
    public Task<Message> GetLastMessageAsync(Guid userId, Guid targetId);
    public Task<Group> InitiateChatAsync(Guid userId, Guid targetId);
}
