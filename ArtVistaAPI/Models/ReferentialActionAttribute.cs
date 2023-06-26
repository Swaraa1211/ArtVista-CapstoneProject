using Microsoft.EntityFrameworkCore.Migrations;

namespace ArtVistaAPI.Models
{
	internal class ReferentialActionAttribute : Attribute
	{
		public ReferentialActionAttribute(ReferentialAction noAction)
		{
			NoAction = noAction;
		}

		public ReferentialAction NoAction { get; }
	}
}