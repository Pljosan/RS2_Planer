using Microsoft.AspNetCore.Mvc;
using Planer.Models;
using System.Collections.Generic;
using System.Linq;
using System.IO;
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

        [HttpGet("[action]/{userId}")]
        public User GetUserInfo(long userId)
        {
            return repository.Users.FirstOrDefault(u => u.UserID == userId);
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

                user.RootFolderLocation = "../../user" + user.UserID + "/";
                user.LinkFolderLocation = "../../user" + user.UserID + "_links/";
                if (!Directory.Exists(user.RootFolderLocation)) {
                    Directory.CreateDirectory(user.RootFolderLocation);
                }

                if (!Directory.Exists(user.LinkFolderLocation)) {
                    Directory.CreateDirectory(user.LinkFolderLocation);
                }


                repository.Save();
                return true;
            }
            return false;
        }

        [HttpPost("[action]")]
        public User GetUserOrRegister([FromBody]User user)
        {
            // Provera da li postoji user sa istim Facebook/Google id i odgovarajucim Providerom
            User existUser = repository.GetUserByEmail(user.Email);
            if(existUser != null && PasswordHash.ScryptHashStringVerify(existUser.Password, user.Password) 
                    && user.Provider == existUser.Provider){
                return existUser;
            }
            // Ako ne postoji pravimo user-a
            var hash = PasswordHash.ScryptHashString(user.Password, PasswordHash.Strength.Medium);
            user.Password = Convert.ToString(hash);
            repository.Create(user);
            repository.Save();

            user.RootFolderLocation = "../../user" + user.UserID + "/";
            user.LinkFolderLocation = "../../user" + user.UserID + "_links/";
            if (!Directory.Exists(user.RootFolderLocation)) {
                Directory.CreateDirectory(user.RootFolderLocation);
            }

            if (!Directory.Exists(user.LinkFolderLocation)) {
                Directory.CreateDirectory(user.LinkFolderLocation);
            }


            repository.Save();

            return user;
        }
    }

    
}