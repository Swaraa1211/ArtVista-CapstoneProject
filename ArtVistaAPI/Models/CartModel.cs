using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class CartModel
	{
		[Key]
		public int cart_id { get; set; }
		public int art_id { get; set; }
		public int quantity { get; set; }
		public string art_name { get; set; }

	}
}
