using QLC.Api.Entities;

namespace QLC.Api.Repositories.Abstractions;

public interface IFeedbackRepository
{
    public Task Save(Feedback feedback);
    public Task<IEnumerable<Feedback>> GetAll();
}