using System.ComponentModel.DataAnnotations;

namespace QLC.Api.Contracts.Court;

public class GetFreeCourtSchedulesModel
{
    [Required]
    public long CourtId { get; set; }
    
    [Required]
    public DateTime Date { get; set; }
}