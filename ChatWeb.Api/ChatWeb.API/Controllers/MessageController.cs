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

    [HttpGet("chats")]
    public async Task<ActionResult> GetChatListAsync()
    {
        var userId = User.GetUserGuid();
        var account = await _service.GetChatListAsync(userId);

        return Ok(account);
    }

    [HttpGet("{groupId}")]
    public async Task<ActionResult> GetChatAsync([FromRoute] Guid groupId)
    {
        return Ok(await _service.GetMessages(groupId));
    }

    [HttpPost]
    public async Task<ActionResult> SendMessageAsync([FromBody] NewMessageViewModel message)
    {
        var guid = User.GetUserGuid();

        await _service.SendAsync(message, guid);

        return StatusCode(201);
    }

    [HttpPost("initiate/{targetId}")]
    public async Task<ActionResult> InitiateChatAsync(Guid targetId)
    {
        var userId = User.GetUserGuid();
        var group = await _service.InitiateChatAsync(userId, targetId);

        return StatusCode(201, group);
    }
}
