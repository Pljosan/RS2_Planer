using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations; 
using Planer.Utilities.DataAnnotations;

namespace Planer.Models {

    public class FileUpload {

        public int UserID { get; set; }

        public bool isUserInputName { get; set; }

        [RequiredWhen("isUserInputName", true, AllowEmptyStrings = false, ErrorMessage = "Please add file name")]
        public string FileName { get; set; }

        [Required(ErrorMessage = "Select a file to upload")]
        public IFormFile File { get; set; }

        public string DestFolder { get; set; }

        public string Path { get; set; }
    }
}