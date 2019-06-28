using System.Linq;

namespace Planer.Models
{
    public class TaskRepository : ITaskRepository
    {
        private ApplicationDbContext repository;

        public TaskRepository(ApplicationDbContext repository) {
            this.repository = repository;
        }

        public IQueryable<Task> Tasks => 
            repository.Tasks;
        
        public void AddTask(Task task)
        {
            this.repository.Set<Task>().Add(task);
            this.repository.SaveChanges();
        }
    }

}