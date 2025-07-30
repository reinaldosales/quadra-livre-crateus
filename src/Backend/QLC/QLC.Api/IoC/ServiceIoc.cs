using QLC.Api.Services;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.IoC;

public static class ServiceIoc
{
    public static IServiceCollection AddServicesIoC(this IServiceCollection services)
    {
        services
            .AddScoped<IUserService, UserService>()
            .AddScoped<IFeedbackService, FeedbackService>()
            .AddScoped<IBookingService, BookingService>()
            .AddScoped<ICourtService, CourtService>()
            .AddSingleton<IEmailService, EmailService>();
        
        return services;
    }
}