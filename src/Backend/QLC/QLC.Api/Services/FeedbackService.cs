using QLC.Api.DTOs.Booking;
using QLC.Api.Entities;
using QLC.Api.Exceptions;
using QLC.Api.Repositories.Abstractions;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.Services;

public class FeedbackService(
    IFeedbackRepository feedbackRepository,
    IUserRepository userRepository,
    ICourtRepository courtRepository,
    IUnitOfWork unitOfWork) : IFeedbackService
{
    private readonly IFeedbackRepository _feedbackRepository = feedbackRepository;
    private readonly IUserRepository _userRepository = userRepository;
    private readonly ICourtRepository _courtRepository = courtRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task CreateFeedback(CreateFeedbackDto feedbackDto)
    {
        User user = await _userRepository.GetById(feedbackDto.UserId)
                    ?? throw new UserNotFoundException();

        Court court = await _courtRepository.GetById(feedbackDto.CourtId)
                      ?? throw new CourtNotFoundException();

        Feedback feedback = new Feedback(
            user,
            court,
            feedbackDto.Comment,
            createdAt: DateTime.Now,
            updatedAt: DateTime.Now,
            deletedAt: null);

        await _feedbackRepository.Save(feedback);

        await _unitOfWork.CommitAsync();
    }

    public Task<IEnumerable<FeedbackDto>> GetAll()
    {
        throw new NotImplementedException();
    }
}