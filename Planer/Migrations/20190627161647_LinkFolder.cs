using Microsoft.EntityFrameworkCore.Migrations;

namespace Planer.Migrations
{
    public partial class LinkFolder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LinkFolderLocation",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LinkFolderLocation",
                table: "Users");
        }
    }
}
