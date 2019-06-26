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

        public User GetUserByEmail(string email) 
        {
            return this.repository.Users.Where(x => (x.Email == email)).FirstOrDefault();
        }

        public void Create(User user)
        {
            this.repository.Set<User>().Add(user);
        }

        public void Save() {
            this.repository.SaveChanges();
        }
    }
}