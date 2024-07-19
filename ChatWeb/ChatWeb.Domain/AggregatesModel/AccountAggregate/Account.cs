using System.ComponentModel.DataAnnotations;

namespace ChatWeb.Domain.AggregatesModel.AccountAggregate;

public class Account
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Email { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Surname { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
