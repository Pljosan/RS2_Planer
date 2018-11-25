using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Planer.Models;

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

        [HttpGet("[action]")]
        public IEnumerable<Task> GetTasks()
        {
            return repository.Tasks;
        }

    }
}