using Microsoft.AspNetCore.Mvc;
using Planer.Models;

namespace Planer.Controllers
{
    public class TaskController : Controller
    {
        private ITaskRepository repository;

        public TaskController(ITaskRepository repository)
        {
            this.repository = repository;
        }

        public ViewResult ListTasks() =>
            View(repository.Tasks);
    }
}