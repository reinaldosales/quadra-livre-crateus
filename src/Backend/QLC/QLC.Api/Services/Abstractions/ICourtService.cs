using QLC.Api.DTOs.Booking;
using QLC.Api.DTOs.Court;

namespace QLC.Api.Services.Abstractions;

public interface ICourtService
{
    public Task CreateCourt(CreateCourtDto courtDto);
    public Task<IEnumerable<CourtDto>> GetAll();
    Task<IEnumerable<FreeCourtSchedulesDto>> GetFreeCourtSchedules(long courtId, DateTime date);
}