using ArtVistaAPI.Data;
using Microsoft.EntityFrameworkCore;
using Hangfire;
using Hangfire.SqlServer;
using ArtVistaAPI.Controllers;

internal class Program
{
	
	private static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		// Add services to the container.

		builder.Services.AddControllers();
		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		builder.Services.AddDbContext<ApplicationDBContext>(options =>
		   options.UseSqlServer(builder.Configuration.GetConnectionString("Db")));

		var app = builder.Build();

		// Configure the HTTP request pipeline.
		if (app.Environment.IsDevelopment())
		{
			app.UseSwagger();
			app.UseSwaggerUI();
		}

		app.UseCors(options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

		app.UseHttpsRedirection();

		app.UseAuthorization();

		//app.UseHangfireServer();
		app.UseHangfireServer();

		RecurringJob.AddOrUpdate<BidPriceController>(x => x.IdentifyUserWithHighestBid(null), "0 0 * * *");


		app.MapControllers();

		app.Run();
	}
}