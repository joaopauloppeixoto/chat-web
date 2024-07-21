using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatWeb.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    public IAccountService _service { get; set; }
    public ITokenService TokenService { get; set; }

    public AuthController(IAccountService service, ITokenService tokenService)
    {
        _service = service;
        TokenService = tokenService;
    }

    /// <summary>
    /// Authenticates the user.
    /// </summary>
    /// <param name="credentials">Model containing Login and password.</param>
    /// <returns>A object with token.</returns>
    [HttpPost]
    [AllowAnonymous]
    [Route("login")]
    public async Task<ActionResult<AuthViewModel>> Authenticate([FromBody] CredentialsViewModel credentials)
    {
        if ((credentials.Email == null || credentials.Email == "")
            && (credentials.Password == null || credentials.Password == ""))
            return Forbid();

        var user = await _service.ValidateLoginAsync(credentials);

        await _service.UpdateLastLoginAsync(user.Email);

        if (user == null)
            return NotFound(new { message = "Invalid user or password." });

        return Ok(new
        {
            Token = TokenService.GenerateToken(user)
        });
    }
}
