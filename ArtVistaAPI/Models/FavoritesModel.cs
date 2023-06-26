using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class FavoritesModel
	{
		[Key]
		public int fav_id { get; set; }
		public int user_id { get; set; }
		public int art_id { get; set; }
	}
}
