using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

using Planer.Models;

namespace Planer.Controllers {

    [Route("api/[controller]")]
    public class FolderController : Controller {
        
        private IUserRepository repository;

        public FolderController(IUserRepository repository) {
            this.repository = repository;
        }    

        [HttpPost("[action]")]
        public JsonResult getRootFolder([FromBody] User user) {
            User userProfile = repository.Users.Where(p => p.UserID == user.UserID).FirstOrDefault();

            Folder rootFolder = new Folder{ UserID = userProfile.UserID, GroupID = 0, Path = userProfile.RootFolderLocation, Name = "Root" };
            Dictionary<string, string> folders = new Dictionary<string, string>();
            List<string> allFolders = Directory.GetDirectories(rootFolder.Path, "*", SearchOption.TopDirectoryOnly).ToList();
            Dictionary<string, string> files = new Dictionary<string, string>();
            List<string> allFiles = Directory.GetFiles(rootFolder.Path, "*.*", SearchOption.TopDirectoryOnly).ToList();

            foreach (string folder in allFolders) {
                int index = folder.LastIndexOf(@"/");
                folders.Add(folder, folder.Substring(index + 1));
            }

            foreach (string file in allFiles) {
                int index = file.LastIndexOf(@"/");
                files.Add(file, file.Substring(index + 1));
            }

            rootFolder.Files = files;
            rootFolder.Subfolders = folders;

            return Json(rootFolder);
        }

        // [HttpGet("[action]")]
        // public JsonResult getFolderContents() {

        // }
    }

}