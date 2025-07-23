using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLC.Api.Context;
using QLC.Api.Contracts.Booking;
using QLC.Api.Contracts.Court;
using QLC.Api.Contracts.Feedback;
using QLC.Api.DTOs.Booking;
using QLC.Api.DTOs.Court;
using QLC.Api.Entities;
using QLC.Api.Extensions;
using QLC.Api.IoC;
using QLC.Api.Services.Abstractions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddInfraestructure(builder.Configuration);
builder.Services.AddRepositoryIoc();
builder.Services.AddServicesIoC();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:5173",
                    "https://localhost:5173"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.MapIdentityApi<User>();

app.MapOpenApi();
app.MapScalarApiReference();

app.UseHttpsRedirection();

var bookings = app
    .MapGroup("api/v1/bookings")
    .WithOpenApi()
    .RequireAuthorization();

bookings.MapPost("/", CreateBooking);

var feedbacks = app
    .MapGroup("api/v1/feedbacks")
    .WithOpenApi()
    .RequireAuthorization();

feedbacks.MapPost("/", CreateFeedback);

var courts = app
    .MapGroup("api/v1/courts")
    .WithOpenApi()
    .RequireAuthorization();

courts.MapPost("/", CreateCourt);

async Task<IResult> CreateCourt(
    CreateCourtModel model,
    ICourtService courtService)
{
    var validationResult = model.Validate();

    if (validationResult != null)
        return validationResult;

    CreateCourtDto createCourtDto = new CreateCourtDto(
        model.Name,
        model.Address,
        model.Type);

    await courtService.CreateCourt(createCourtDto);

    return Results.Created();
}

async Task<IResult> CreateBooking(
    CreateBookingModel model,
    IBookingService bookingService,
    ILogger<CreateBookingModel> logger)
{
    try
    {
        var validationResult = model.Validate();

        if (validationResult != null)
            return validationResult;

        CreateBookingDto createBookingDto = new CreateBookingDto(
            model.UserId,
            model.CourtId,
            model.StartDate,
            model.EndDate);

        await bookingService.CreateBooking(createBookingDto);

        return Results.Created();
    }
    catch (Exception e)
    {
        logger.LogError(e.Message);
        return Results.BadRequest();
    }
}

async Task<IResult> CreateFeedback(CreateFeedbackModel model,
    IFeedbackService feedbackService,
    ILogger<CreateFeedbackModel> logger)
{
    try
    {
        var validationResult = model.Validate();

        if (validationResult != null)
            return validationResult;

        CreateFeedbackDto createFeedbackDto = new CreateFeedbackDto(
            model.UserId,
            model.CourtId,
            model.Comment);

        await feedbackService.CreateFeedback(createFeedbackDto);

        return Results.Created();
    }
    catch (Exception e)
    {
        logger.LogError(e.Message);
        return Results.BadRequest();
    }
}

app.MapPost("/logout", async (SignInManager<User> signInManager, [FromBody] object empty) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
});

app.Run();