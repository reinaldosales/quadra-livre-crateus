using QLC.Api.DTOs.Court;
using QLC.Api.Repositories.Abstractions;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.Services;

public class CourtService(
    ICourtRepository courtRepository,
    IUnitOfWork unitOfWork) : ICourtService
{
    private readonly ICourtRepository _courtRepository = courtRepository;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    
    public Task Save(CreateCourtDto courtDto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<CourtDto>> GetAll()
    {
        throw new NotImplementedException();
    }
}