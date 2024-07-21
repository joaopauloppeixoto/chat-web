namespace ChatWeb.Domain.AggregatesModel.MessengerAggregate;

public interface IMessageRepository
{
    public Task AddAsync(Message message);
    public Task UpdateAsync(Guid id, Message message);
    public Task DisableAsync(Guid id);
    Task<IList<Message>> GetMessages(Guid userId, Guid targetId);
}
