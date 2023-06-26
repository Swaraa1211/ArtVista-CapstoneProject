using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class bidpricecontroller : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BidPrice",
                columns: table => new
                {
                    bidprice_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    bidprice = table.Column<int>(type: "int", nullable: false),
                    art_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BidPrice", x => x.bidprice_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BidPrice");
        }
    }
}
