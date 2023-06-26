using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class PaymentModel
	{
		[Key]
		public int payment_id { get; set; }
		public int total_amount { get; set; }
		public int order_id { get; set; }
		public DateTime order_date { get; set; }
	}
}
