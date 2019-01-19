using Microsoft.AspNetCore.Mvc;
using Planer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sodium;
using System;

namespace Planer.Controllers {

    [Route("api/[controller]")]
    public class UserController : Controller {

        private IUserRepository repository;

        public UserController(IUserRepository repository) {
            this.repository = repository;
        }

        //ovo => je kao da smo rekli return
        public ViewResult ListUsers() =>
            View(repository.Users);

        
        [HttpGet("[action]")]
        public IEnumerable<User> GetUsers()
        {
            return repository.Users;
        }

        [HttpPost("[action]")]
        public User GetUser([FromBody]User user)
        {
            Console.WriteLine("Moj user: " + user.Email + " " + user.Password);
            User existUser = repository.GetUserByEmail(user.Email);
            if(existUser != null){
                Console.WriteLine("Yess not null!");
            }
            if(existUser != null && PasswordHash.ScryptHashStringVerify(existUser.Password, user.Password)){
                return existUser;
            }
            return null;
        }

        [HttpPost("[action]")]
        public bool Register([FromBody] User user)
        {
            User newUser = repository.GetUserByEmail(user.Email);
            if (newUser == null) {
                var hash = PasswordHash.ScryptHashString(user.Password, PasswordHash.Strength.Medium);
                user.Password = Convert.ToString(hash);
                repository.Create(user);
                repository.Save();
                return true;
            }
            return false;
        }
    }
}