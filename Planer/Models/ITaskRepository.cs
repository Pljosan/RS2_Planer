using System.Linq;

namespace Planer.Models
{
    public interface ITaskRepository
    {
        IQueryable<Task> Tasks { get; }
    }
}