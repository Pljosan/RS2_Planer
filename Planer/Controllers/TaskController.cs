using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Planer.Models;
using System.Linq;
using System;

namespace Planer.Controllers
{   
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private ITaskRepository repository;        

        public TaskController(ITaskRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet("[action]/{userId}")]
        public IEnumerable<Task> GetTasks(int userId)
        {
            var tasks = repository.Tasks.Where(l => l.User.UserID == userId || l.Public);
            return tasks;
        }

        [HttpPost("[action]")]
        public Task AddTask([FromBody] Task task)
        {
            task.Notified = false;
            var res = repository.AddTask(task);

            return res;
        }

        [HttpGet("[action]/{userId}")]
        public IEnumerable<Task> GetUpcomingTasks(int userId) {
            var today = DateTime.Now;

            var tasks = repository.Tasks.Where(t => (t.User.UserID == userId || t.Public) &&  
                                                    (DateTime.Parse(t.Date + " " + t.Time)).Subtract(today).Days <= 7 && 
                                                    (DateTime.Parse(t.Date + " " + t.Time)).Subtract(today).Days >= 0);
            
            return tasks;
        }
    }
}