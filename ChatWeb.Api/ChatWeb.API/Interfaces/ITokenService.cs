using ChatWeb.Domain.AggregatesModel.AccountAggregate;

namespace ChatWeb.API.Interfaces;

public interface ITokenService
{
    public string GenerateToken(Account user);
}
