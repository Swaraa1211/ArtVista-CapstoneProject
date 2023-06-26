using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class BidPriceModel
	{
		[Key]
		public int bidprice_id { get; set; }
		public int bidprice { get; set; }
		public int art_id { get; set; }
		public int user_id { get; set; }
	}
}

