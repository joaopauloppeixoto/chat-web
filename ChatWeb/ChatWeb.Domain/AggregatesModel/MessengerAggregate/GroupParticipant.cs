using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ChatWeb.Domain.AggregatesModel.MessengerAggregate;

public class GroupParticipant
{
    [Required]
    [ForeignKey("Group")]
    public Guid GroupId { get; set; }

    [Required]
    [ForeignKey("Account")]
    public Guid AccountId { get; set; }

    public bool AgreedToJoin { get; set; }
}
