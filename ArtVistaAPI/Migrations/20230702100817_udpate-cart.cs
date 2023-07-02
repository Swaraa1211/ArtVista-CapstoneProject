using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class udpatecart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Cart_art_id",
                table: "Cart",
                column: "art_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_Art_art_id",
                table: "Cart",
                column: "art_id",
                principalTable: "Art",
                principalColumn: "art_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_Art_art_id",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_art_id",
                table: "Cart");
        }
    }
}
