namespace Planer.Models
{
    public class Task
    {
        public int TaskID { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
    }
}