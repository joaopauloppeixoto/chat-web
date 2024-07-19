namespace ChatWeb.Domain.AggregatesModel.AccountAggregate;

public interface IAccountRepository
{
    public void Register(Account account);
    public void Update(Guid Id, Account account);
    public void UpdateName(Guid Id, string name, string surname);
    public void Disable(Guid id);
    public Account SearchByEmail(string email);
}
