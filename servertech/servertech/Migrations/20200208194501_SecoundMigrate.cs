using Microsoft.EntityFrameworkCore.Migrations;

namespace servertech.Migrations
{
    public partial class SecoundMigrate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Departmentid",
                table: "Employees",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Departmentid",
                table: "Employees",
                column: "Departmentid");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_Departmentid",
                table: "Employees",
                column: "Departmentid",
                principalTable: "Departments",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_Departmentid",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_Departmentid",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Departmentid",
                table: "Employees");
        }
    }
}
