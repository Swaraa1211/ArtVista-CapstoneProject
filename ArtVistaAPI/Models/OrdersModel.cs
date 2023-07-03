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
		public string order_date { get; set; }
		public string art_id { get; set; }
		public string art_name { get; set; }
		public string picture { get; set; }
		public string quantity { get; set;}
		public string price { get; set;}

		//order_id INT PRIMARY KEY identity(1,1),
  //user_id INT,
  //total_amount INT,
  //payment VARCHAR(255),
  //order_date VARCHAR(255),
  //art_id INT,
  //art_name VARCHAR(255),
  //picture VARCHAR(255),
  //quantity INT,
  //price INT,
	}
}
