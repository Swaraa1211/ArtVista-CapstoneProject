﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    /// <inheritdoc />
    public partial class orderstablecontroller : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    total_amount = table.Column<int>(type: "int", nullable: false),
                    payment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    order_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.order_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
