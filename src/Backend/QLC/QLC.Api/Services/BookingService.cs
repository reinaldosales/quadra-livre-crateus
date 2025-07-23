using QLC.Api.DTOs.Booking;
using QLC.Api.Entities;
using QLC.Api.Exceptions;
using QLC.Api.Repositories.Abstractions;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.Services;

public class BookingService(
    IBookingRepository bookingRepository,
    IUserRepository userRepository,
    ICourtRepository courtRepository,
    IUnitOfWork unitOfWork) : IBookingService
{
    private readonly IBookingRepository _bookingRepository = bookingRepository;
    private readonly IUserRepository _userRepository = userRepository;
    private readonly ICourtRepository _courtRepository = courtRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    
    public async Task CreateBooking(CreateBookingDto bookingDto)
    {
        User user = await _userRepository.GetByEmail(bookingDto.UserId)
            ?? throw new UserNotFoundException();
        
        Court court = await _courtRepository.GetById(bookingDto.CourtId)
            ?? throw new CourtNotFoundException();

        Booking? bookingAlreadyMade = await _bookingRepository
            .GetByUserAndCourt(user.Id, bookingDto.CourtId, BookingStatus.Created);

        if (bookingAlreadyMade is not null)
            throw new BookingAlreadyMadeException();
        
        if(!court.IsAvailable)
            throw new CourtNotAvailableException();
        
        Booking booking = new Booking(
            user,
            court,
            bookingDto.StartDate,
            bookingDto.EndDate,
            BookingStatus.Created,
            createdAt: DateTime.Now,
            updatedAt: DateTime.Now,
            deletedAt: null);
        
        await _bookingRepository.Save(booking);

        await _unitOfWork.CommitAsync();
    }

    public Task<IEnumerable<BookingDto>> GetAll()
    {
        throw new NotImplementedException();
    }
}