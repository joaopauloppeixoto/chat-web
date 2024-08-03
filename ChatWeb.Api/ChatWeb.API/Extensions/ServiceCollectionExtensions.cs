using ChatWeb.API.Interfaces;
using ChatWeb.API.Services;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;
using ChatWeb.Infrastructure.Repositories;

namespace ChatWeb.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddProjectServices(this IServiceCollection services)
    {
        services.AddScoped<ITokenService, TokenService>();

        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<IMessageService, MessageService>();

        services.AddScoped<IAccountRepository, AccountRepository>();
        services.AddScoped<IMessageRepository, MessageRepository>();

        return services;
    }
}
