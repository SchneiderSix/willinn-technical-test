using API.Data;
using API.Services;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Get connection string from env vars
//"DefaultConnection": "Server=sql-server;Initial Catalog=UserDb;User ID=SA;Password=Secret123456!;TrustServerCertificate=true;"

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

var app = builder.Build();

// Handle migrations
DatabaseManagementService.MigrationInitialisation(app);

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
