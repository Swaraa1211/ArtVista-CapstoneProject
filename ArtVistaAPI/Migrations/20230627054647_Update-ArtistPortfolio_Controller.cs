using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateArtistPortfolio_Controller : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "artist_picture",
                table: "ArtistPortfolio",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "masterpiece_picture",
                table: "ArtistPortfolio",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "artist_picture",
                table: "ArtistPortfolio");

            migrationBuilder.DropColumn(
                name: "masterpiece_picture",
                table: "ArtistPortfolio");
        }
    }
}
