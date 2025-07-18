namespace QLC.Api.Repositories.Abstractions;

public interface IUnitOfWork
{
    public Task CommitAsync();
}