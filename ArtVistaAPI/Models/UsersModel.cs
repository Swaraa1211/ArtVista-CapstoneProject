using System.ComponentModel.DataAnnotations;

namespace ArtVistaAPI.Models
{
	public class UsersModel
	{
		[Key]
		public int user_id { get; set; }
		public string user_name { get; set; }
		public string user_password { get; set; }
		public string user_email { get; set; }
	}
}
