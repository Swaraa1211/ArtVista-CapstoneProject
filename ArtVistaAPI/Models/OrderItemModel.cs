using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class OrderItemModel
	{
		[Key]
		public int orderitem_id { get; set; }
		public int order_id { get; set; }
		public int art_id { get; set;}
		public string art_name { get;set; }
		public int quantity { get;set; }
		public int price { get; set; }
		
	}
}
