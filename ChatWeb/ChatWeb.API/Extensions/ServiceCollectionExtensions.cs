using ChatWeb.API.Interfaces;
using ChatWeb.API.Services;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using ChatWeb.Infrastructure.Repositories;

namespace ChatWeb.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddProjectServices(this IServiceCollection services)
    {
        services.AddScoped<ITokenService, TokenService>();

        services.AddScoped<IAccountService, AccountService>();

        services.AddScoped<IAccountRepository, AccountRepository>();

        return services;
    }
}
