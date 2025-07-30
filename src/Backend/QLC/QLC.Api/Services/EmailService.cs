using System.Net;
using System.Net.Mail;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.Services;

public class EmailService(
    IConfiguration configuration,
    ILogger<EmailService> logger) : IEmailService
{
    private string? From => _configuration["Email:From"];
    private string? Password => _configuration["Email:Password"];

    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<EmailService> _logger = logger;

    public async Task SendEmail(string email, string subject, string body)
    {
        try
        {
            var smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(From, Password),
                EnableSsl = true
            };

            await smtpClient.SendMailAsync(new MailMessage(From, email)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            });
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
        }
    }
}