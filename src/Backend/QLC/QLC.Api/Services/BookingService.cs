using QLC.Api.DTOs.Booking;
using QLC.Api.Entities;
using QLC.Api.Exceptions;
using QLC.Api.Repositories.Abstractions;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.Services;

public class BookingService(
    IBookingRepository bookingRepository,
    IUserRepository userRepository,
    ICourtRepository courtRepository,
    IEmailService emailService,
    IUnitOfWork unitOfWork) : IBookingService
{
    private readonly IBookingRepository _bookingRepository = bookingRepository;
    private readonly IUserRepository _userRepository = userRepository;
    private readonly ICourtRepository _courtRepository = courtRepository;
    private readonly IEmailService _emailService = emailService;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    
    public async Task CreateBooking(CreateBookingDto bookingDto)
    {
        User user = await _userRepository.GetById(bookingDto.UserId)
            ?? throw new UserNotFoundException();
        
        Court court = await _courtRepository.GetById(bookingDto.CourtId)
            ?? throw new CourtNotFoundException();

        Booking? bookingAlreadyMade = await _bookingRepository
            .GetByUserAndCourt(user.Id, bookingDto.CourtId, BookingStatus.Created);

        if (bookingAlreadyMade is not null)
            throw new BookingAlreadyMadeException();
        
        if(!court.IsAvailable)
            throw new CourtNotAvailableException();
        
        Booking booking = new Booking(
            user.Id,
            court.Id,
            bookingDto.StartDate,
            bookingDto.EndDate,
            BookingStatus.Created,
            createdAt: DateTime.Now,
            updatedAt: DateTime.Now,
            deletedAt: null);
        
        await _bookingRepository.Save(booking);
        
        string htmlBody = string.Format(@"
          <!DOCTYPE html>
          <html lang=""pt-BR"">
          <head>
            <meta charset=""UTF-8"">
            <title>Comprovante de Reserva</title>
            <style>
              body {{
                font-family: 'Segoe UI', sans-serif;
                background-color: #f3f3f3;
                margin: 0;
                padding: 0;
              }}

              .email-wrapper {{
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
              }}

              .header {{
                background-color: #2B9954;
                color: white;
                padding: 20px;
                text-align: center;
              }}

              .header h1 {{
                margin: 0;
                font-size: 24px;
                letter-spacing: 1px;
              }}

              .content {{
                padding: 30px 25px;
              }}

              .content p {{
                font-size: 16px;
                color: #333;
                line-height: 1.6;
              }}

              .reserva-box {{
                background-color: #EAF7EE;
                border-left: 6px solid #1E723D;
                padding: 15px 20px;
                margin: 20px 0;
                border-radius: 6px;
              }}

              .reserva-box strong {{
                color: #144E2A;
              }}

              .signature {{
                margin-top: 30px;
              }}

              .footer {{
                background-color: #F0F0F0;
                text-align: center;
                padding: 15px;
                font-size: 12px;
                color: #777;
              }}

              @media (max-width: 600px) {{
                .content {{
                  padding: 20px;
                }}
              }}
            </style>
          </head>
          <body>

            <div class=""email-wrapper"">
              <div class=""header"">
                <h1>Quadra Livre Crateús</h1>
              </div>

              <div class=""content"">
                <p>Olá,</p>
                <p>
                  Estamos te enviando o comprovante para sua solicitação de <strong>reserva de quadra</strong>. Aqui estão os detalhes:
                </p>

                <div class=""reserva-box"">
                  <p>
                    <strong>Data:</strong> {0}<br>
                    <strong>Horário:</strong> das {1} às {2}
                  </p>
                </div>

                <div class=""signature"">
                  <p>
                    Atenciosamente,<br>
                    <strong>Equipe Quadra Livre Crateús</strong>
                  </p>
                </div>
              </div>

              <div class=""footer"">
                Este é um e-mail automático. Por favor, não responda.
              </div>
            </div>

          </body>
          </html>
          ",
            booking.StartDate.ToString("dd/MM/yyyy"),
            booking.StartDate.ToString("HH:mm"),
            booking.EndDate.ToString("HH:mm")
        );


        await emailService.SendEmail(user.Email, "Comprovante de reserva de quadra",
            htmlBody);

        await _unitOfWork.CommitAsync();
    }

    public Task<IEnumerable<BookingDto>> GetAll()
    {
        throw new NotImplementedException();
    }
}