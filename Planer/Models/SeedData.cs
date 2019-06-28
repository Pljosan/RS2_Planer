using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace Planer.Models
{
    public static class SeedData
    {
        public static void EnsurePopulated(IApplicationBuilder app)
        {
            ApplicationDbContext context = app.ApplicationServices.GetRequiredService<ApplicationDbContext>();

            context.Database.Migrate();

            if (!context.Users.Any()) {
                context.Users.AddRange (
                    new User {
                        FirstName = "Test", LastName = "User", RootFolderLocation = "../../user1/", Email = "test@email.com", Password = "testpass", LinkFolderLocation = "../../user1_links/"
                    }
                );

                context.SaveChanges();
            }

            if (!context.Tasks.Any())
            {
                context.Tasks.AddRange(
                    new Task
                    {
                        Name = "Task 1", Date = "12-12-12", Time = "10:43", UserId = 1
                    }
                );
                context.SaveChanges();
            }
        }

    }

}