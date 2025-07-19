using QLC.Api.Entities;

namespace QLC.Api.Repositories.Abstractions;

public interface ICourtRepository
{
    public Task Save(Court court);
    public Task<IEnumerable<Court>> GetAll();
    public Task<Court?> GetById(long id);
}