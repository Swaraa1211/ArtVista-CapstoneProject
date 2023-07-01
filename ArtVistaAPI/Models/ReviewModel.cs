using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArtVistaAPI.Models
{
	public class ReviewModel
	{
		[Key]
		public int review_id { get; set; }
		public int rating { get; set; }
		public string reviewcomment { get; set; }
		[ForeignKey("Users")]
		public int User_id { get; set; }
		[ForeignKey("Art")]
		public int Art_id { get; set; }

		public UsersModel Users { get; set; }
		public ArtModel Art { get; set; }

	}
}
