using System.Linq;
using System.Reflection.PortableExecutable;

namespace Planer.Models
{
    public interface ITaskRepository
    {
        IQueryable<Task> Tasks { get; }

    }
}