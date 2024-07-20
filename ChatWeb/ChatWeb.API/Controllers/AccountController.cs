using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ChatWeb.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    public IAccountService _service { get; set; }
    public AccountController(IAccountService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult> GetAccountInfoAsync()
    {
        var userEmail = User.Claims.SingleOrDefault(w => w.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userEmail == null)
        {
            return BadRequest(new { Message = "Invalid Email."});
        }

        var account = await _service.GetAccountInfoAsync(userEmail);

        return Ok(account);
    }

    [HttpPost]
    public async Task<ActionResult> CreateAccountAsync([FromBody] NewAccountViewModel newAccount)
    {
        await _service.RegisterAsync(newAccount);

        return StatusCode(201);
    }
}
