using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArtVistaAPI.Models
{
	public class CartModel
	{
		[Key]
		public int cart_id { get; set; }
		[ForeignKey("Art")]
		public int art_id { get; set; }
	
		public int quantity { get; set; }
		public string art_name { get; set; }

		public ArtModel Art { get; set; }
	}
}
