using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class BidArtModel
	{
		[Key]
		public int BidArt_id { get; set; }
		public string BidArt_description { get; set; }
		public string BidArt_name { get; set; }
		public string BidArtist_name { get; set; }
		public int BidPrice { get; set; }
		public string picture { get; set; }
		public int User_id { get; set; }
		public string User_name { get; set;}
	}
}
