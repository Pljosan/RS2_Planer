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
    public class FolderController : Controller {
        
        private IUserRepository repository;

        public FolderController(IUserRepository repository) {
            this.repository = repository;
        }    

        [HttpGet("[action]/{userId}")]
        public JsonResult getRootFolder(long userId) {
            User userProfile = repository.Users.Where(p => p.UserID == userId).FirstOrDefault();

            Folder rootFolder = new Folder{ UserID = userProfile.UserID, GroupID = 0, Path = userProfile.RootFolderLocation, Name = "Root" };
            Folder resultFolder = createReturnFolder(rootFolder);

            return Json(resultFolder);
        }

        [HttpGet("[action]/{userId}/{folderPath}")]
        public JsonResult getFolderContents(int userId, string folderPath) {
            folderPath = WebUtility.UrlDecode(folderPath);
            Folder prepFolder = new Folder{ UserID = userId, GroupID = 0, Path = folderPath };
            Folder resultFolder = createReturnFolder(prepFolder);

            return Json(resultFolder);
        }

        [HttpPost("[action]")]
        public JsonResult createNewFolder(Folder folder) {
            Dictionary<string, object> result = new Dictionary<string, object>();
            
            string folderPath = folder.Path + "/" + folder.Name;
            if (!Directory.Exists(folderPath)) {
                Directory.CreateDirectory(folderPath);
            }
            
            
            result.Add("result", true);
            return Json(result);
        }

        [HttpDelete("[action]/{folderPath}")]
        public JsonResult deleteFolder(string folderPath) {
            folderPath = WebUtility.UrlDecode(folderPath);
            Dictionary<string, object> result = new Dictionary<string, object>();
            
            Console.WriteLine("deleting " + folderPath);

            if (Directory.Exists(folderPath)) {
                Directory.Delete(folderPath, true);
            }
            
            
            result.Add("result", true);
            return Json(result);
        }

        public Folder createReturnFolder(Folder folder) {
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