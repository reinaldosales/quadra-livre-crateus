using System.ComponentModel.DataAnnotations;

namespace QLC.Api.Contracts.Feedback;

public class CreateFeedbackModel
{
    [Required]
    public long CourtId { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Comment { get; set; }
}