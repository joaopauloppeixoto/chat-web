using System.Net;

namespace ChatWeb.Common.CustomExceptions;

public class CustomException : Exception
{
    public HttpStatusCode StatusCode { get; set; }
    public CustomException(string message, Exception? innerException = null, HttpStatusCode statusCode = HttpStatusCode.BadRequest) : base(message, innerException)
    {
        StatusCode = statusCode;
    }
}
