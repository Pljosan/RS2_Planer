namespace Planer.Models
{
    public class TaskFile
    {
        public int TaskFileID { get; set; }
        public Task Task { get; set; }
        public string FilePath { get; set; }
    }
}