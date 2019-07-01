namespace Planer.Models
{
    public class UserTask
    {
        public int UserTaskID { get; set; }
        public Task Task { get; set; }
        public User User { get; set; }

    }
}