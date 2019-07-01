using System.Linq;
using System.Reflection.PortableExecutable;

namespace Planer.Models
{
    public interface IUserTaskRepository
    {
        IQueryable<UserTask> UserTasks { get; }

        void Save (UserTask userTask);
        void Delete(UserTask userTask);
    }
}