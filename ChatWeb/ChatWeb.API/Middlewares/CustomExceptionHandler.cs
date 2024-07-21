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
        catch (Exception error)
        {
            var response = context.Response;
            response.ContentType = "application/json";

            switch (error)
            {
                case InvalidTokenException:
                    response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    break;

                case CustomException:
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    break;

                default:
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            var result = JsonSerializer.Serialize(new
            {
                message = error?.Message,
                innerException = error?.InnerException?.Message
            });

            await response.WriteAsync(result);
        }
    }
}
