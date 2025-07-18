using QLC.Api.DTOs.Court;

namespace QLC.Api.Services.Abstractions;

public interface ICourtService
{
    public Task Save(CreateCourtDto courtDto);
    public Task<IEnumerable<CourtDto>> GetAll();
}