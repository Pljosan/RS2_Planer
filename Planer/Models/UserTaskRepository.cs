using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


namespace Planer.Models
{
    public class UserTaskRepository : IUserTaskRepository
    {
        private ApplicationDbContext repository;

        public UserTaskRepository(ApplicationDbContext repository) {
            this.repository = repository;
        }

        public IQueryable<UserTask> UserTasks => 
            repository.UserTasks.Include(l => l.Task).ThenInclude(t => t.User);


        public void Save (UserTask userTask)
        {
            IEnumerable<object> attachments = new List<object>();
            attachments.Append(userTask.Task);
            attachments.Append(userTask.User);

            repository.AttachRange(attachments);

            if (userTask.UserTaskID == 0)
                repository.UserTasks.Add(userTask);

            repository.SaveChanges();                
        }

        public void Save ()
        {
            repository.SaveChanges();                
        }


        public void Delete(UserTask userTask) 
        {
            repository.Remove(userTask);
        }

    }

}