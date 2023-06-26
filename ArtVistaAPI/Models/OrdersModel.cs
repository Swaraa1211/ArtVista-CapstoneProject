using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class OrdersModel
	{
		[Key]
		public int order_id { get; set; }
		public int user_id { get; set; }
		public int total_amount { get; set; }
		public string payment { get; set; }
		public DateTime order_date { get; set; }
	}
}
