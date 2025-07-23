using System.ComponentModel.DataAnnotations;

namespace QLC.Api.Contracts.Court;

public class CreateCourtModel
{
    [Required]
    public string Name { get; set; }
    
    [Required]
    public string Address { get; set; }
    
    [Required]
    public CourtType Type { get; set; }
}