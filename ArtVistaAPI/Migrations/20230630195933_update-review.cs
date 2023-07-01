using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatereview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Review",
                newName: "User_id");

            migrationBuilder.RenameColumn(
                name: "art_id",
                table: "Review",
                newName: "Art_id");

            migrationBuilder.CreateIndex(
                name: "IX_Review_Art_id",
                table: "Review",
                column: "Art_id");

            migrationBuilder.CreateIndex(
                name: "IX_Review_User_id",
                table: "Review",
                column: "User_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Art_Art_id",
                table: "Review",
                column: "Art_id",
                principalTable: "Art",
                principalColumn: "art_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Users_User_id",
                table: "Review",
                column: "User_id",
                principalTable: "Users",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Review_Art_Art_id",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_Users_User_id",
                table: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Review_Art_id",
                table: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Review_User_id",
                table: "Review");

            migrationBuilder.RenameColumn(
                name: "User_id",
                table: "Review",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "Art_id",
                table: "Review",
                newName: "art_id");
        }
    }
}
