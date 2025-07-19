using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QLC.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReplaceDescriptionToComment_Feedback : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Feedbacks",
                newName: "Comment");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Feedbacks",
                newName: "Description");
        }
    }
}
