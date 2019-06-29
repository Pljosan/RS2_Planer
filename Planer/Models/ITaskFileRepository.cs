using System.Linq;
using System.Reflection.PortableExecutable;

namespace Planer.Models
{
    public interface ITaskFileRepository
    {
        IQueryable<TaskFile> TaskFiles { get; }

        void Save (TaskFile taskFile);
        void Save ();
        void Delete(TaskFile taskFile);
    }
}