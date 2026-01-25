using ChatWeb.API.Contexts;
using ChatWeb.API.Extensions;
using ChatWeb.API.Middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ChatWebContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
builder.Services.AddProjectServices();
builder.Services.AddControllers();
builder.Services.RegisterCors();
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

app.UseCorsPolicy();

app.UseMiddleware<CustomExceptionHandler>();

app.MapControllers();

app.Run();
