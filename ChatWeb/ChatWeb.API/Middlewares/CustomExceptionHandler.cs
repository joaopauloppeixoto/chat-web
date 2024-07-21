using ChatWeb.Common.CustomExceptions;
using System.Net;
using System.Text.Json;

namespace ChatWeb.API.Middlewares;

public class CustomExceptionHandler
{
    private readonly RequestDelegate _next;

    public CustomExceptionHandler(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (CustomException error)
        {
            var response = context.Response;

            response.ContentType = "application/json";
            response.StatusCode = (int) error.StatusCode;

            var result = JsonSerializer.Serialize(new
            {
                message = error?.Message,
                innerException = error?.InnerException?.Message
            });

            await response.WriteAsync(result);
        }
        catch (Exception error)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var result = JsonSerializer.Serialize(new
            {
                message = error?.Message,
                innerException = error?.InnerException?.Message
            });

            await response.WriteAsync(result);
        }
    }
}
