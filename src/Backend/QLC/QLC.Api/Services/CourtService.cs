using QLC.Api.DTOs.Court;
using QLC.Api.Entities;
using QLC.Api.Repositories.Abstractions;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.Services;

public class CourtService(
    ICourtRepository courtRepository,
    IUnitOfWork unitOfWork) : ICourtService
{
    private readonly ICourtRepository _courtRepository = courtRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task CreateCourt(CreateCourtDto courtDto)
    {
        Court court = new Court(
            courtDto.Name,
            courtDto.Address,
            courtDto.Type,
            isAvailable: true,
            createdAt: DateTime.Now,
            updatedAt: DateTime.Now,
            deletedAt: null);
        
        await _courtRepository.Save(court);
        
        await _unitOfWork.CommitAsync();
    }

    public async Task<IEnumerable<CourtDto>> GetAll()
    {
        var courts = await _courtRepository.GetAll();
        
        return courts.Select(court => new CourtDto(court.Id, court.Name, court.Address, court.Type, court.IsAvailable));
    }
}