using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatWeb.Domain.AggregatesModel.MessengerAggregate;

public class Message
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [ForeignKey("Account")]
    public Guid SenderId { get; set; }

    [Required]
    [ForeignKey("Account")]
    public Guid ReceiverId { get; set; }

    [Required]
    public string Content { get; set; }
}
