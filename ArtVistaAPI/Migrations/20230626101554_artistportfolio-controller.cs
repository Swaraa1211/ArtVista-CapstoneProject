using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class artistportfoliocontroller : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArtistPortfolio",
                columns: table => new
                {
                    artist_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    artist_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    about = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    masterpiece = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    contact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    journey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    user_name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtistPortfolio", x => x.artist_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArtistPortfolio");
        }
    }
}
