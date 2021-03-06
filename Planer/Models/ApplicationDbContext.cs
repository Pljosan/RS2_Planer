using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.DependencyInjection;

namespace Planer.Models {

    public class ApplicationDbContext : DbContext {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) 
            {} 

        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<TaskFile> TaskFiles { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }
     }

}