using Microsoft.EntityFrameworkCore;
using BankingApi.Data;
using BankingApi.Repositories;
using BankingApi.Services;
using BankingApi.ServiceAgents;

// Dependency Injection file

var builder = WebApplication.CreateBuilder(args);

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()    // Allow requests from any domain
                  .AllowAnyMethod()    // Allow GET, POST, PUT, DELETE, etc.
                  .AllowAnyHeader();   // Allow any headers
        });
});


// Add services to the container.
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();  
builder.Services.AddControllers(); 

// Configures the database context for dependency injection.
// Uses SQL Server as the database provider.
builder.Services.AddDbContext<BankingDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddScoped<TransactionRepository>();
builder.Services.AddScoped<TransactionService>();
builder.Services.AddHttpClient<TransactionServiceAgent>();
builder.Services.AddScoped<TransactionServiceAgent>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins"); // Apply the CORS policy
app.UseHttpsRedirection();
//app.UseAuthorization();
app.MapControllers();

app.Run();
