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
    }
}