using System.Linq;

namespace Planer.Models {
    
    public interface IUserRepository {

        IQueryable<User> Users { get; }


        void Create(User user);
        void Save();

    }
}