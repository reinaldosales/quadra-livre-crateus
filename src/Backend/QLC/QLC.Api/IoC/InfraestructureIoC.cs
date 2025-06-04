using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QLC.Api.Context;
using QLC.Api.Entities;

namespace QLC.Api.IoC;

public static class InfraestructureIoC
{
    public static IServiceCollection AddInfraestructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(("Data Source=quadralivrecrateus.dat")));
        
        return services;
    }
}