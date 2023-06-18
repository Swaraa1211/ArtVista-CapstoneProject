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
	}
}