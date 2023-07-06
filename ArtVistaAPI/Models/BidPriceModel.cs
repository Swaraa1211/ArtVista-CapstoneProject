using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class BidPriceModel
	{
		[Key]
		public int Bidprice_id { get; set; }
		public int Bidprice { get; set; }
		public int BidArt_id { get; set; }
		public string Status { get; set; }
		public string Art_name { get; set; }
		public int User_id { get; set; }
	}
}

