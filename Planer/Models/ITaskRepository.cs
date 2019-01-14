using System.Linq;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography;

namespace Planer.Models
{
    public interface ITaskRepository
    {
        IQueryable<Task> Tasks { get; }

        void AddTask(Task task);

    }
}