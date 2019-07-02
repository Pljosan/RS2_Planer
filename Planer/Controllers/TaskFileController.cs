using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.IO;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using Planer.Models;
using Planer.Models.ViewModels;

namespace Planer.Controllers {

    [Route("api/[controller]")]
    public class TaskFileController : Controller {

        private ITaskFileRepository repository;
        public TaskFileController(ITaskFileRepository repository) {
            this.repository = repository;
        }    

        [HttpPost("[action]")]
        public JsonResult addFileToTask([FromBody] TaskFileViewModel taskFile) {
            Dictionary<string, object> result = new Dictionary<string, object>();
            var taskFilesList = repository.TaskFiles;

            Console.WriteLine("DOBILI SMO");
            Console.WriteLine(taskFile.Files);
            Console.WriteLine(taskFile.Tasks);

            foreach (var task in taskFile.Tasks)
            {
                foreach (var file in taskFile.Files)
                {
                    if (taskFilesList.Where(t => t.Task.TaskID == task.TaskID && t.FilePath == file).Count() == 0) {
                        TaskFile tf = new TaskFile { Task = task, FilePath = file };
                        repository.Save(tf);
                    }
                }
            }

            result.Add("result", true);
            return Json(result);
        }

        [HttpGet("[action]/{userId}/{taskId}")]
        public JsonResult getFilesForTask(long userId, long taskId) {
            Dictionary<string, object> result = new Dictionary<string, object>();

            var files = repository.TaskFiles.Where(t => t.Task.TaskID == taskId && t.Task.User.UserID == userId);

            result.Add("result", true);
            result.Add("files", files);
            return Json(files.ToArray());
        }

        [HttpGet("[action]/{userId}")]
        public IEnumerable<TaskFile> getTaskFilesForUser(long userId) {

            var files = repository.TaskFiles.Where(t => t.Task.User.UserID == userId);
            return files.ToArray();
        }
    }
}