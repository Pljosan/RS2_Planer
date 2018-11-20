using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.IO;
using Microsoft.AspNetCore.Mvc;

using Planer.Models;

namespace Planer.Controllers {

    public class FileUploadController : Controller {

        private IUserRepository repository;

        public FileUploadController(IUserRepository repository) {
            this.repository = repository;
        }    


        public ViewResult UploadFileForm() {
            return View();
        } 

        [HttpPost]
        public ViewResult UploadFileForm(FileUpload file) {
            
            if (ModelState.IsValid) {
                    User user = repository.Users.Where(p => p.UserID == file.UserID).FirstOrDefault();

                    if (!Directory.Exists(user.RootFolderLocation)) {
                        Directory.CreateDirectory(user.RootFolderLocation);
                    }

                    Console.WriteLine(file.File.FileName);
                    Console.WriteLine(file.isUserInputName);
                    string fileName = file.isUserInputName ? file.FileName : Path.GetFileNameWithoutExtension(file.File.FileName);
                    
                    string filePath = user.RootFolderLocation + fileName + Path.GetExtension(file.File.FileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        file.File.CopyTo(fileStream);
                    }
            }

            return View();
        }
    }

}