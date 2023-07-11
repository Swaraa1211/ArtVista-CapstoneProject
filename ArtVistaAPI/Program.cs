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
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen();

		builder.Services.AddDbContext<ApplicationDBContext>(options =>
			options.UseSqlServer(builder.Configuration.GetConnectionString("Db")));

		builder.Services.AddHangfire(configuration => configuration
			.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
			.UseSimpleAssemblyNameTypeSerializer()
			.UseRecommendedSerializerSettings()
			.UseSqlServerStorage(builder.Configuration.GetConnectionString("Db"), new SqlServerStorageOptions
			{
				CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
				SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
				QueuePollInterval = TimeSpan.Zero,
				UseRecommendedIsolationLevel = true,
				DisableGlobalLocks = true
			}));
		builder.Services.AddHangfireServer();

		var app = builder.Build();

		// Configure the HTTP request pipeline.
		//if (app.Environment.IsDevelopment())
		//{
		//	app.UseSwagger();
		//	app.UseSwaggerUI();
		//}
		app.UseSwagger();
		app.UseSwaggerUI();

		app.UseCors(options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

		app.UseHttpsRedirection();

		app.UseAuthorization();

		using (var scope = app.Services.CreateScope())
		{
			var serviceProvider = scope.ServiceProvider;
			var recurringJobManager = serviceProvider.GetRequiredService<IRecurringJobManager>();

			// Enqueue the recurring job to trigger IdentifyUserWithHighestBid method
			recurringJobManager.AddOrUpdate<BidPriceController>("IdentifyUserWithHighestBid", x => x.IdentifyUserWithHighestBid(null), Cron.Daily(0, 0));
		}

		app.UseHangfireDashboard("/dashboard");

		app.MapControllers();

		app.Run();
	}
}
