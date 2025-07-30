namespace QLC.Api.Exceptions;

public class BookingAlreadyMadeException() : Exception("Já existe uma reserva sua feita para essa quadra. O máximo é uma reserva por quadra e dia.");