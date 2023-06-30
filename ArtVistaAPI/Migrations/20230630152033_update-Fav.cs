using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateFav : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Favorites",
                newName: "Userid");

            migrationBuilder.RenameColumn(
                name: "art_id",
                table: "Favorites",
                newName: "Artid");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_Artid",
                table: "Favorites",
                column: "Artid");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_Userid",
                table: "Favorites",
                column: "Userid");

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Art_Artid",
                table: "Favorites",
                column: "Artid",
                principalTable: "Art",
                principalColumn: "art_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Favorites_Users_Userid",
                table: "Favorites",
                column: "Userid",
                principalTable: "Users",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Art_Artid",
                table: "Favorites");

            migrationBuilder.DropForeignKey(
                name: "FK_Favorites_Users_Userid",
                table: "Favorites");

            migrationBuilder.DropIndex(
                name: "IX_Favorites_Artid",
                table: "Favorites");

            migrationBuilder.DropIndex(
                name: "IX_Favorites_Userid",
                table: "Favorites");

            migrationBuilder.RenameColumn(
                name: "Userid",
                table: "Favorites",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "Artid",
                table: "Favorites",
                newName: "art_id");
        }
    }
}
