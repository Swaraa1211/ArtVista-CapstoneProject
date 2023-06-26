using ArtVistaAPI.Migrations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArtVistaAPI.Models
{
	public class ArtModel
	{
		[Key]
		public int art_id { get; set; }
		public string art_description { get; set; }
		public string artist_name { get; set; }
		public string art_name { get; set;}
		public int price { get; set; }
		public string picture { get; set;}
		public int user_id { get; set; }
		public string user_name { get; set; }

		//public UsersModel Users { get; set; }
	}
}
