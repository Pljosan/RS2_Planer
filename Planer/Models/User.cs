using System.Globalization;

namespace Planer.Models {

    public class User {

        public int UserID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string RootFolderLocation { get; set; }

        public string LinkFolderLocation { get; set; }

        public string Email { get; set; }

        // U slucaju logovanja preko Facebook/Google ovde se cuva Facebook/Google ID
        public string Password { get; set; }

        // GOOGLE, FACEBOOK, null        
        public string Provider {get; set; }
    }

}