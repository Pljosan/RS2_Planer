using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


namespace Planer.Models
{
    public class TaskFileRepository : ITaskFileRepository
    {
        private ApplicationDbContext repository;

        public TaskFileRepository(ApplicationDbContext repository) {
            this.repository = repository;
        }

        public IQueryable<TaskFile> TaskFiles => 
            repository.TaskFiles.Include(l => l.Task).ThenInclude(t => t.User);

        public void Save (TaskFile taskFile)
        {
            // IEnumerable<object> attachments = new List<object>();
            // attachments.Append(taskFile.Task);
            // attachments.Append(taskFile.User);

            // repository.AttachRange(attachments);
            repository.Attach(taskFile.Task);
            repository.Attach(taskFile.Task.User);

            if (taskFile.TaskFileID == 0)
                repository.TaskFiles.Add(taskFile);

            repository.SaveChanges();                
        }

        public void Save ()
        {
            repository.SaveChanges();                
        }


        public void Delete(TaskFile taskFile) 
        {
            Link existing = repository.Links.Find(taskFile.TaskFileID);
            repository.Remove(existing);
        }

    }

}