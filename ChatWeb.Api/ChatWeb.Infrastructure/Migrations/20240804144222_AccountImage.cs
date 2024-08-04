using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatWeb.Infrastructure.Migrations
{
    public partial class AccountImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Accounts",
                type: "longtext",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GroupParticipants_AccountId",
                table: "GroupParticipants",
                column: "AccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupParticipants_Accounts_AccountId",
                table: "GroupParticipants",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupParticipants_Accounts_AccountId",
                table: "GroupParticipants");

            migrationBuilder.DropIndex(
                name: "IX_GroupParticipants_AccountId",
                table: "GroupParticipants");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Accounts");
        }
    }
}
