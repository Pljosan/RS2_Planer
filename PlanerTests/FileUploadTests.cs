using System;
using System.IO;
using Xunit;
using Planer.Models;
using Planer.Controllers;
using Microsoft.AspNetCore.Http;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace PlanerTests{

    public class FileUploadTests {

        [Fact]
        public void UploadFileToProperLocationAndName() {
            //Given
            
            //create repo and populate it
            User user = new User { UserID = 1, RootFolderLocation = "./FileUploadTestFolder/user1/" };
            var userRepo = new Mock<IUserRepository>();
            List<User> users = new List<User>();
            users.Add(user);
            userRepo.Setup(f => f.Users).Returns(users.AsQueryable());

            Task task = new Task { TaskID = 1, User = user, Date = "2019-07-03", Time = "12:00" };
            var taskRepo = new Mock<ITaskRepository>();
            List<Task> tasks = new List<Task>();
            tasks.Add(task);
            taskRepo.Setup(f => f.Tasks).Returns(tasks.AsQueryable());

            TaskFile taskFile = new TaskFile { TaskFileID = 1, Task = task, FilePath = "./FileUploadTestFolder/user1/" };
            var taskFileRepo = new Mock<ITaskFileRepository>();
            List<TaskFile> taskFiles = new List<TaskFile>();
            taskFiles.Add(taskFile);
            taskFileRepo.Setup(f => f.TaskFiles).Returns(taskFiles.AsQueryable());

            //create file
            var file = new Mock<IFormFile>();
            file.Setup(f => f.FileName).Returns("test.txt");
            FileUpload fileUpload = new FileUpload { UserID = 1, FileName = "test", File = file.Object, isUserInputName = true };

            //create controller
            FileUploadController controller = new FileUploadController(userRepo.Object, taskRepo.Object, taskFileRepo.Object);

            //When
            controller.UploadFileForm(fileUpload);
        
            //Then
            Assert.True(Directory.Exists(user.RootFolderLocation));
            if (fileUpload.isUserInputName) {
                Assert.True(File.Exists(user.RootFolderLocation + fileUpload.FileName + ".txt"));
            }
            else {
                Assert.True(File.Exists(user.RootFolderLocation + "test.txt"));
            }
        }

    }
}
