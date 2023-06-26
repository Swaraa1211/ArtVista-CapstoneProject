﻿// <auto-generated />
using ArtVistaAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ArtVistaAPI.Migrations
{
    [DbContext(typeof(ApplicationDBContext))]
    [Migration("20230626101554_artistportfolio-controller")]
    partial class artistportfoliocontroller
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ArtVistaAPI.Models.ArtModel", b =>
                {
                    b.Property<int>("art_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("art_id"));

                    b.Property<string>("art_description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("art_name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("artist_name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("picture")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("price")
                        .HasColumnType("int");

                    b.Property<int>("user_id")
                        .HasColumnType("int");

                    b.Property<string>("user_name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("art_id");

                    b.ToTable("Art");
                });

            modelBuilder.Entity("ArtVistaAPI.Models.ArtistPortfolioModel", b =>
                {
                    b.Property<int>("artist_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("artist_id"));

                    b.Property<string>("about")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("artist_name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("contact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("journey")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("masterpiece")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("user_id")
                        .HasColumnType("int");

                    b.Property<string>("user_name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("artist_id");

                    b.ToTable("ArtistPortfolio");
                });

            modelBuilder.Entity("ArtVistaAPI.Models.UsersModel", b =>
                {
                    b.Property<int>("user_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("user_id"));

                    b.Property<string>("user_email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("user_name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("user_password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("user_id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
