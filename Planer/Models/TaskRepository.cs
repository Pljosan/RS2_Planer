using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Planer.Models
{
    public class TaskRepository : ITaskRepository
    {
        private ApplicationDbContext repository;

        public TaskRepository(ApplicationDbContext repository) {
            this.repository = repository;
        }

        public IQueryable<Task> Tasks => 
            repository.Tasks.Include(t => t.User);
        
        public void AddTask(Task task)
        {
            repository.Attach(task.User);

            if (task.TaskID == 0)
                repository.Tasks.Add(task);

            repository.SaveChanges(); 
        }
    }

}