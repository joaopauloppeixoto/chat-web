using ChatWeb.API.Contexts;
using ChatWeb.API.Extensions;
using ChatWeb.API.Middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("ConnectionString") ?? builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<ChatWebContext>(options => options.UseMySQL(connectionString));
builder.Services.AddProjectServices();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.AddSwaggerGenWithAuthentication();
builder.AddAuthenticationConfig();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseMiddleware<CustomExceptionHandler>();

app.MapControllers();

app.Run();
