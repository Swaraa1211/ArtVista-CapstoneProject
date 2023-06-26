using Microsoft.EntityFrameworkCore;
using ArtVistaAPI.Models;
using System.Collections.Generic;

namespace ArtVistaAPI.Data
{
	public class ApplicationDBContext : DbContext
	{
		public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
			: base(options)
		{
		}
		public DbSet<UsersModel> Users { get; set; }
		public DbSet<ArtModel> Art { get; set; }
		//public DbSet<FavoritesModel> Favorites { get; set; }
		public DbSet<ArtistPortfolioModel> ArtistPortfolio { get; set; }
		public DbSet<FavoritesModel> Favorites { get; set; }
		public DbSet<BidPriceModel> BidPrice { get; set; }
		public DbSet<ReviewModel> Review { get; set; }
	}
}