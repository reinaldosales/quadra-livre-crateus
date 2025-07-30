namespace QLC.Api.Services.Abstractions;

public interface IEmailService
{
    public Task SendEmail(string email, string subject, string body);
}