using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using Planer.Models;

namespace Planer.Controllers {

    /// <summary>
    /// File upload controller.
    /// Contains an api endpoint for file upload.
    /// </summary>
    [Route("api/[controller]")]
    public class FileUploadController : Controller {

        private IUserRepository repository;

        public FileUploadController(IUserRepository repository) {
            this.repository = repository;
        }    

        /// <summary>
        /// Parses the FormData (<paramref name="file"/> received from the browser, validates it and saves the file to user's repository.
        /// </summary>
        /// <param name="file"/>FileUpload type object
        /// <returns>
        /// Returns the following JSON:
        /// On success: <c> {"result": bool} </c>
        /// On failure: <c> {"result": bool, "error_code": int, "error_message": string} </c>
        /// </returns>
        [HttpPost("[action]")]
        public JsonResult UploadFileForm(FileUpload file) {

            Console.WriteLine("Hi from the controller!");
            Console.WriteLine("file1: " + file.FileName);
            Console.WriteLine("file2: " + file.UserID);
            Console.WriteLine("file3: " + file.isUserInputName);
            
            Dictionary<string, object> result = new Dictionary<string, object>();
            if (ModelState.IsValid) {
                    User user = repository.Users.Where(p => p.UserID == file.UserID).FirstOrDefault();

                    if (!Directory.Exists(user.RootFolderLocation)) {
                        Directory.CreateDirectory(user.RootFolderLocation);
                    }

                    string fileName = file.isUserInputName ? file.FileName : Path.GetFileNameWithoutExtension(file.File.FileName);
                    
                    string filePath = user.RootFolderLocation + fileName + Path.GetExtension(file.File.FileName);

                    if (!System.IO.File.Exists(filePath)) {
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            file.File.CopyTo(fileStream);
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
    }

}