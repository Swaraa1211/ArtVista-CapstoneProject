using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ArtVistaAPI.Models
{
	public class ArtistPortfolioModel
	{
		[Key]
		public int artist_id { get; set; }
		public string artist_name { get; set; }
		public string artist_picture { get; set; }
		public string about { get; set; }
		public string masterpiece { get; set; }
		public string masterpiece_picture { get; set; }
		public string contact { get; set; }
		public string journey { get; set; }
		public int user_id { get; set; }
		public string user_name { get; set; }

		//public UsersModel Users { get; set; }
	}
}
