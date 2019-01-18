using System.Globalization;

namespace Planer.Models {

    public class Link {

        public int LinkID { get; set; }
        
        public User User { get; set; }

        public string Url { get; set; }

        public string PathToFile { get; set; }

    }

}