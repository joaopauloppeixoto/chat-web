using ChatWeb.API.Extensions;
using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatWeb.API.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MessageController : ControllerBase
{
    public IMessageService _service { get; set; }
    public ITokenService TokenService { get; set; }

    public MessageController(IMessageService service, ITokenService tokenService)
    {
        _service = service;
        TokenService = tokenService;
    }

    [HttpGet]
    public async Task<ActionResult> GetChatListAsync()
    {
        var email = User.GetUserEmail();
        var account = await _service.GetChatListAsync(email);

        return Ok(account);
    }

    [HttpGet("{targetId}")]
    public async Task<ActionResult> GetChatAsync([FromRoute] Guid targetId)
    {
        var userId = User.GetUserGuid();

        return Ok(await _service.GetMessages(userId, targetId));
    }

    [HttpPost]
    public async Task<ActionResult> SendMessageAsync([FromBody] NewMessageViewModel message)
    {
        var guid = User.GetUserGuid();

        await _service.SendAsync(message, guid);

        return StatusCode(201);
    }
}
