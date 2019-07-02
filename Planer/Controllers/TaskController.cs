using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Planer.Models;
using System.Linq;
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
            var tasks = repository.Tasks.Where(l => l.User.UserID == userId);
            return tasks;
        }

        [HttpPost("[action]")]
        public void AddTask([FromBody] Task task)
        {
            repository.AddTask(task);
        }

        public void CheckTaskExpiration() {

        }
    }
}