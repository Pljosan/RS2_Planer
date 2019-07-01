using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Planer.Migrations
{
    public partial class TaskFile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Tasks",
                newName: "UserID");

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "Tasks",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "TaskFiles",
                columns: table => new
                {
                    TaskFileID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TaskID = table.Column<int>(nullable: true),
                    UserID = table.Column<int>(nullable: true),
                    FilePath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskFiles", x => x.TaskFileID);
                    table.ForeignKey(
                        name: "FK_TaskFiles_Tasks_TaskID",
                        column: x => x.TaskID,
                        principalTable: "Tasks",
                        principalColumn: "TaskID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TaskFiles_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_UserID",
                table: "Tasks",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_TaskFiles_TaskID",
                table: "TaskFiles",
                column: "TaskID");

            migrationBuilder.CreateIndex(
                name: "IX_TaskFiles_UserID",
                table: "TaskFiles",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Users_UserID",
                table: "Tasks",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Users_UserID",
                table: "Tasks");

            migrationBuilder.DropTable(
                name: "TaskFiles");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_UserID",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Tasks",
                newName: "UserId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Tasks",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
