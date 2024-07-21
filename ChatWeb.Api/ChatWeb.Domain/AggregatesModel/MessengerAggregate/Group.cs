using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatWeb.Domain.AggregatesModel.MessengerAggregate;

public class Group
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    public bool IsOneOnOne { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public virtual IList<GroupParticipant> Participants { get; set; }
}
