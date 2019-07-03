using System.Globalization;

namespace Planer.Models
{
    public class Task
    {
        public int TaskID { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string GroupID { get; set; }
        public bool Notified { get; set; }
        public bool Public { get; set; }
    }
}