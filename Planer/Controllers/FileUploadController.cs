using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.IO;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using Planer.Models;

namespace Planer.Controllers {

    [Route("api/[controller]")]
    public class FileUploadController : Controller {

        private IUserRepository repository;
        private ITaskRepository taskRepository;
        private ITaskFileRepository taskFileRepository;

        public FileUploadController(IUserRepository repository, ITaskRepository taskRepository, ITaskFileRepository taskFileRepository) {
            this.repository = repository;
            this.taskRepository = taskRepository;
            this.taskFileRepository = taskFileRepository;
        }    

        [HttpPost("[action]")]
        public JsonResult UploadFileForm(FileUpload file) {

            Console.WriteLine("Hi from the controller!");
            Console.WriteLine("file1: " + file.FileName);
            Console.WriteLine("file2: " + file.UserID);
            Console.WriteLine("file3: " + file.isUserInputName);
            Console.WriteLine("file4: " + file.DestFolder);
            Console.WriteLine("file4: " + file.TaskID);
            
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ModelState.IsValid) {
                    User user = repository.Users.Where(p => p.UserID == file.UserID).FirstOrDefault();

                    string folderPath = "";
                    if (String.IsNullOrEmpty(file.DestFolder)) {
                        Console.WriteLine("hi im here");
                        folderPath = user.RootFolderLocation;
                    } else {
                        Console.WriteLine("hi im here :(");
                        folderPath = file.DestFolder;
                    }

                    if(folderPath.LastIndexOf("/") != folderPath.Length - 1) {
                        folderPath += "/";
                    }
                    
                    if (!Directory.Exists(folderPath)) {
                        Directory.CreateDirectory(folderPath);
                    }

                    Console.WriteLine("folder " + folderPath);
                    string fileName = file.isUserInputName ? file.FileName : Path.GetFileNameWithoutExtension(file.File.FileName);
                    
                    string filePath = folderPath + fileName + Path.GetExtension(file.File.FileName);

                    Console.WriteLine("file " + filePath);

                    if (!System.IO.File.Exists(filePath)) {
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            file.File.CopyTo(fileStream);
                        }

                        Console.WriteLine("ovde");

                        if (file.TaskID != null) {
                            Task task = this.taskRepository.Tasks.FirstOrDefault(t => t.TaskID == file.TaskID);
                            TaskFile taskFile = new TaskFile { Task = task, FilePath = filePath };
                            this.taskFileRepository.Save(taskFile);
                        }

                        result.Add("result", true);

                        return Json(result);
                    } else {
                        result.Add("result", false);
                        result.Add("error_code", 421);
                        result.Add("error_message", "file already exists");

                        return Json(result);
                    }
            } 
                
            result.Add("result", false);
            result.Add("error_code", 1);
            result.Add("error_message", "form validation failed");

            return Json(result);
            
        }

        [HttpGet("[action]/{fileName}")]
        public FileContentResult downloadFile(string fileName){
            fileName = WebUtility.UrlDecode(fileName);
            var content = System.IO.File.ReadAllBytes(fileName);
            var contentType = "APPLICATION/octet-stream";
            var newFileName = "something.bin";
            return File(content, contentType, newFileName);
        }

        [HttpDelete("[action]/{path}")]
        public JsonResult deleteFile(string path){
            Dictionary<string, object> result = new Dictionary<string, object>();

            path = path.Replace("%2F", "/");
            System.IO.File.Delete(path);

            result.Add("result", true);
            return Json(result);
        }

        [HttpPut("[action]")]
        public JsonResult RenameFile(FileUpload file){
            Dictionary<string, object> result = new Dictionary<string, object>();

            string oldName = file.Path;
            string extension = oldName.Substring(oldName.LastIndexOf("."));
            string newName = oldName.Substring(0, oldName.LastIndexOf("/") + 1) + file.FileName + extension;

            Console.WriteLine("novo ime: " + newName);

            System.IO.File.Move(oldName, newName);

            result.Add("result", true);
            return Json(result);
        }

        [HttpPut("[action]")]
        public JsonResult MoveFile(FileUpload file){
            Dictionary<string, object> result = new Dictionary<string, object>();

            string oldLocation = file.Path;
            string fileName = oldLocation.Substring(oldLocation.LastIndexOf("/"));
            string newLocation = file.FileName + fileName;

            System.IO.File.Move(oldLocation, newLocation);

            result.Add("result", true);
            return Json(result);
        }
        
        [HttpPut("[action]")]
        public JsonResult CopyFile(FileUpload file){
            Dictionary<string, object> result = new Dictionary<string, object>();

            string oldLocation = file.Path;
            string fileName = oldLocation.Substring(oldLocation.LastIndexOf("/"));
            string newLocation = file.FileName + fileName;

            System.IO.File.Copy(oldLocation, newLocation);

            result.Add("result", true);
            return Json(result);
        }

    }

}