using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        var config = builder.Configuration;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidAudience = config["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy =>
        policy.RequireClaim("is_admin", "true"));
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

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
    .WithOpenApi();

courts.MapPost("/", CreateCourt).RequireAuthorization("Admin");
courts.MapGet("/", GetAllCourts);

async Task<IResult> GetAllCourts(
    ICourtService courtService,
    HttpContext context,
    ILogger<Program> logger)
{
    try
    {
        return Results.Ok(await courtService.GetAll());
    }
    catch (Exception e)
    {
        logger.LogError(e.Message);
        return Results.BadRequest();
    }
}

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
    ILogger<CreateBookingModel> logger,
    HttpContext httpContext)
{
    try
    {
        var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(userId))
            return Results.Unauthorized();
        
        var validationResult = model.Validate();

        if (validationResult != null)
            return validationResult;

        CreateBookingDto createBookingDto = new CreateBookingDto(
            userId,
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

async Task<IResult> CreateFeedback(
    CreateFeedbackModel model,
    IFeedbackService feedbackService,
    ILogger<CreateFeedbackModel> logger,
    HttpContext httpContext)
{
    try
    {
        var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (string.IsNullOrEmpty(userId))
            return Results.Unauthorized();
        
        var validationResult = model.Validate();

        if (validationResult != null)
            return validationResult;

        CreateFeedbackDto createFeedbackDto = new CreateFeedbackDto(
            userId,
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

app.MapPost("/api/v1/login", async (
    LoginRequest model,
    UserManager<User> userManager,
    SignInManager<User> signInManager,
    IConfiguration config) =>
{
    var user = await userManager.FindByEmailAsync(model.Email);
    
    if (user == null)
        return Results.Unauthorized();

    var isPasswordValid = await userManager.CheckPasswordAsync(user, model.Password);
    if (!isPasswordValid)
        return Results.Unauthorized();

    var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
        new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
        new Claim(ClaimTypes.NameIdentifier, user.Id)
    };

    if (user.IsAdmin)
        claims.Add(new Claim("is_admin", "true"));

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: config["Jwt:Issuer"],
        audience: config["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: creds
    );

    var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

    return Results.Ok(new { token = tokenStr });
});


app.Run();