using Microsoft.AspNetCore.Mvc;
using Planer.Models;
using System.Linq;

namespace Planer.Controllers {

    public class UserController : Controller {

        private IUserRepository repository;

        public UserController(IUserRepository repository) {
            this.repository = repository;
        }

        //ovo => je kao da smo rekli return
        public ViewResult ListUsers() =>
            View(repository.Users);
    
    }
}