namespace QLC.Api.DTOs.Court;

public record CreateCourtDto(
    string Name,
    string Address,
    CourtType Type);