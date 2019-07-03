using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Planer.Models;
using System.Linq;
using System;

namespace Planer.Controllers
{   
    [Route("api/[controller]")]
    public class UserTaskController : Controller
    {
        private IUserTaskRepository repository;     
        private IUserRepository userRepository;   
        private ITaskRepository taskRepository;

        public UserTaskController(IUserTaskRepository repository, IUserRepository userRepository, ITaskRepository taskRepository)
        {
            this.repository = repository;
            this.userRepository = userRepository;
            this.taskRepository = taskRepository;
        }

        [HttpGet("[action]/{taskId}")]
        public IEnumerable<UserTask> GetAllUsersForTask(int taskId)
        {
            var userTasks = repository.UserTasks.Where(l => l.Task.TaskID == taskId);
            return userTasks;
        }

        [HttpPost("[action]")]
        public void AddUserTask([FromBody] UserTask user_task)
        {
            Console.WriteLine("user " + user_task.User.UserID);
            Console.WriteLine("task " + user_task.Task.TaskID);
            int taskId = user_task.Task.TaskID;
            int userId = user_task.User.UserID;

            User user = userRepository.Users.Where(p => p.UserID == userId).FirstOrDefault();
            Task task = taskRepository.Tasks.Where(p => p.TaskID == taskId).FirstOrDefault();
            UserTask userTask = new UserTask();
            userTask.Task = task;
            userTask.User = user;
            repository.Save(userTask);
        }

    }
}