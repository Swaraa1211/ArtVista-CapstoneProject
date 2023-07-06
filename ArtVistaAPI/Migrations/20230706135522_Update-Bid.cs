using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "BidPrice",
                newName: "User_id");

            migrationBuilder.RenameColumn(
                name: "bidprice",
                table: "BidPrice",
                newName: "Bidprice");

            migrationBuilder.RenameColumn(
                name: "bidprice_id",
                table: "BidPrice",
                newName: "Bidprice_id");

            migrationBuilder.RenameColumn(
                name: "art_id",
                table: "BidPrice",
                newName: "BidArt_id");

            migrationBuilder.AddColumn<string>(
                name: "Art_name",
                table: "BidPrice",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "BidPrice",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BidArt",
                columns: table => new
                {
                    BidArt_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BidArt_description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BidArt_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BidArtist_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BidPrice = table.Column<int>(type: "int", nullable: false),
                    picture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_id = table.Column<int>(type: "int", nullable: false),
                    User_name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BidArt", x => x.BidArt_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BidArt");

            migrationBuilder.DropColumn(
                name: "Art_name",
                table: "BidPrice");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "BidPrice");

            migrationBuilder.RenameColumn(
                name: "User_id",
                table: "BidPrice",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "Bidprice",
                table: "BidPrice",
                newName: "bidprice");

            migrationBuilder.RenameColumn(
                name: "Bidprice_id",
                table: "BidPrice",
                newName: "bidprice_id");

            migrationBuilder.RenameColumn(
                name: "BidArt_id",
                table: "BidPrice",
                newName: "art_id");
        }
    }
}
