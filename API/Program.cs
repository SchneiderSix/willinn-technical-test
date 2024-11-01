using API.Data;
using API.Services;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Get connection string from env vars
//"DefaultConnection": "Server=sql-server;Initial Catalog=UserDb;User ID=SA;Password=Secret123456!;TrustServerCertificate=true;"

var front = builder.Configuration["front"] ?? "frontend";
var server = builder.Configuration["server"] ?? "sql-server";
var db = builder.Configuration["db"] ?? "UserDb";
var user = builder.Configuration["user"] ?? "SA";
var password = builder.Configuration["password"] ?? "Secret123456!";

var connectionString = $"Server={server};Initial Catalog={db};User ID={user};Password={password};TrustServerCertificate=true;";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Handle json properties for model error validation
builder.Services.AddControllers(options =>
{
    options.ModelMetadataDetailsProviders.Add(new SystemTextJsonValidationMetadataProvider());
});

// Handle migrations on start
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(connectionString);
});

// Define rate limiter middleware, limit 100 calls in 1 minute
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.User.Identity?.Name ?? httpContext.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 100,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));

    options.OnRejected = (context, cancellationToken) =>
    {
        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
        {
            context.HttpContext.Response.Headers.RetryAfter = retryAfter.TotalSeconds.ToString();
        }

        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.WriteAsync("Too many requests. Please try again later.");

        return new ValueTask();
    };
});

// Handle CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "frontApp", configurePolicy: policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3000")//AllowAnyOrigin()
            .AllowAnyHeader()//.AllowAnyHeader()
            .AllowAnyMethod()//.AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Handle migrations
DatabaseManagementService.MigrationInitialisation(app);

// Use rate limiter middleware
app.UseRateLimiter();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

app.UseCors("frontApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
