using QLC.Api.Repositories;
using QLC.Api.Repositories.Abstractions;
using QLC.Api.Services;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.IoC;

public static class RepositoryIoc
{
    public static IServiceCollection AddRepositoryIoc(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        
        return services;
    }
}