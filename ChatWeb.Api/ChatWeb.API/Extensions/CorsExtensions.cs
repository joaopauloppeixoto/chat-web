namespace ChatWeb.API.Extensions;

public static class CorsExtensions
{
    public static IServiceCollection RegisterCors(this IServiceCollection services)
    {
        services.AddCors(options => options.AddPolicy("AllowAll", policy =>
        {
            policy.AllowAnyOrigin();
            policy.AllowAnyMethod();
            policy.AllowAnyHeader();
        }));

        return services;
    }

    public static IApplicationBuilder UseCorsPolicy(this IApplicationBuilder app)
    {
        app.UseCors("AllowAll");

        return app;
    }
}
