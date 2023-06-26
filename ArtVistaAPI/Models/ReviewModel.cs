using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class ReviewModel
	{
		[Key]
		public int review_id { get; set; }
		public int rating { get; set; }
		public string reviewcomment { get; set; }
		public int user_id { get; set; }
		public int art_id { get; set; }

	}
}
