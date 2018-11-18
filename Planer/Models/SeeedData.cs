using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace Planer.Models {

    public static class SeedData {

        public static void EnsurePopulated(IApplicationBuilder app) {
            ApplicationDbContext context = app.ApplicationServices.GetRequiredService<ApplicationDbContext>();

            context.Database.Migrate();

            if (!context.Users.Any()) {
                context.Users.AddRange (
                    new User {
                        FirstName = "Test", LastName = "User", RootFolderLocation = ".", Email = "test@email.com", Password = "testpass"
                    }
                );

                context.SaveChanges();
            }
        }

    }

}