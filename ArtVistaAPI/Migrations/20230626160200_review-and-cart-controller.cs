using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class reviewandcartcontroller : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    cart_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    art_id = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    art_name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => x.cart_id);
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    review_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rating = table.Column<int>(type: "int", nullable: false),
                    reviewcomment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    art_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.review_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Review");
        }
    }
}
