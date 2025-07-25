using System.ComponentModel.DataAnnotations;

namespace QLC.Api.Contracts.Booking;

public class CreateBookingModel
{
    [Required]
    public long CourtId { get; set; }

    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }
}