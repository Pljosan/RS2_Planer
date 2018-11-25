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
            Folder resultFolder = createReturnFolder(rootFolder);

            return Json(resultFolder);
        }

        [HttpPost("[action]")]
        public JsonResult getFolderContents([FromBody] Folder folder) {

            Folder prepFolder = new Folder{ UserID = folder.UserID, GroupID = 0, Path = folder.Path, Name = folder.Name };
            Folder resultFolder = createReturnFolder(prepFolder);

            return Json(resultFolder);
        }

        private Folder createReturnFolder(Folder folder) {
            Dictionary<string, string> folders = new Dictionary<string, string>();
            List<string> allFolders = Directory.GetDirectories(folder.Path, "*", SearchOption.TopDirectoryOnly).ToList();
            Dictionary<string, string> files = new Dictionary<string, string>();
            List<string> allFiles = Directory.GetFiles(folder.Path, "*.*", SearchOption.TopDirectoryOnly).ToList();

            foreach (string f in allFolders) {
                int index = f.LastIndexOf(@"/");
                folders.Add(f, f.Substring(index + 1));
            }

            foreach (string file in allFiles) {
                int index = file.LastIndexOf(@"/");
                files.Add(file, file.Substring(index + 1));
            }

            folder.Files = files;
            folder.Subfolders = folders;

            return folder;
        }
    }

}