using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ArtVistaAPI.Models
{
	public class FavoritesModel
	{
		[Key]
		public int fav_id { get; set; }

		[ForeignKey("Users")]
		public int Userid { get; set; }

		[ForeignKey("Art")]
		public int Artid { get; set; }

		public UsersModel Users { get; set; }
		public ArtModel Art { get; set; }
	}
}
