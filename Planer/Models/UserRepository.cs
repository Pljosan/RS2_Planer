using System.Collections.Generic;
using System.Linq;

namespace Planer.Models {

    public class UserRepository : IUserRepository {

        private ApplicationDbContext repository;

        public UserRepository(ApplicationDbContext repository) {
            this.repository = repository;
        }

        public IQueryable<User> Users => 
            repository.Users;

        public void Create(User user)
        {
            this.repository.Set<User>().Add(user);
        }

        public void Save() {
            this.repository.SaveChanges();
        }
    }
}