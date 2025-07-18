using QLC.Api.DTOs.Booking;
using QLC.Api.Repositories.Abstractions;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.Services;

public class FeedbackService(
    IFeedbackRepository feedbackRepository,
    IUnitOfWork unitOfWork) : IFeedbackService
{
    private readonly IFeedbackRepository _feedbackRepository = feedbackRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    
    public Task Save(CreateFeedbackDto feedbackDto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<FeedbackDto>> GetAll()
    {
        throw new NotImplementedException();
    }
}