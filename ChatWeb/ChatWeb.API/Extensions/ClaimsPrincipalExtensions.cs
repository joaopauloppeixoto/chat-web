using ChatWeb.Common.CustomExceptions;
using System.Security.Claims;

namespace ChatWeb.API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetUserEmail(this ClaimsPrincipal user)
    {
        var email = user.Claims.SingleOrDefault(w => w.Type == ClaimTypes.NameIdentifier)?.Value;

        if (email == null)
        {
            throw new InvalidTokenException();
        }

        return email;
    }
}
