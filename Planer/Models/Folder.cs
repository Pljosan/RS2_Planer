using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations; 
using Planer.Utilities.DataAnnotations;
using System.Collections.Generic;

namespace Planer.Models {

    public class Folder {

        public int UserID { get; set; }

        public int GroupID { get; set; }

        public string Path { get; set; }

        public string Name { get; set; }

        public Dictionary<string, string> Files { get; set; }

        public Dictionary<string, string> Subfolders { get; set; }
    }
}