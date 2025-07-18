using QLC.Api.DTOs.Booking;

namespace QLC.Api.Services.Abstractions;

public interface IFeedbackService
{
    public Task Save(CreateFeedbackDto feedbackDto);
    public Task<IEnumerable<FeedbackDto>> GetAll();
}