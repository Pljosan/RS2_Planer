using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Linq;
using System.IO;

using Planer.Models;


namespace Planer.Scheduled
{
    public class ScheduledTask : ScheduledProcessor
    {
        private ITaskRepository repository;  

        public ScheduledTask(IServiceScopeFactory serviceScopeFactory, ITaskRepository taskRepository) : base(serviceScopeFactory)
        {
            this.repository = taskRepository;
        }

        protected override string Schedule => "*/1 * * * *";

        public override System.Threading.Tasks.Task ProcessInScope(IServiceProvider serviceProvider)
        {
            Console.WriteLine("Processing starts here");
            var today = DateTime.Now;
            var allTasks = this.repository.Tasks.Where(t => !t.Notified 
                                                            && (DateTime.Parse(t.Date + " " + t.Time)).Subtract(today).Hours < 2 
                                                            && (DateTime.Parse(t.Date + " " + t.Time)).Subtract(today).Hours > 0
                                                            && (DateTime.Parse(t.Date + " " + t.Time)).Subtract(today).Days == 0);

            foreach (var task in allTasks.ToList()) {
                Console.WriteLine("task: " + task.Name);
                Console.WriteLine("notified: " + task.Notified);
                Console.WriteLine("date time: " + task.Date + " " + task.Time);
                Console.WriteLine("date time object: " + DateTime.Parse(task.Date + " " + task.Time));
                Console.WriteLine("interval object: " + DateTime.Parse(task.Date + " " + task.Time).Subtract(today).ToString());
                Console.WriteLine("hours: " + DateTime.Parse(task.Date + " " + task.Time).Subtract(today).Hours);

                SmtpClient client = new SmtpClient("smtp.gmail.com");
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("ana.bajic13@gmail.com", "pass"); // neka gmail adresa i pass za nju
                client.EnableSsl = true;
                client.Port = 587;
                
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("ana.bajic13@gmail.com");
                mailMessage.To.Add(task.User.Email);
                mailMessage.Subject = "You have a task coming up!";
                
                var msg = System.IO.File.ReadAllText("upcomingTaskEmail.html");

                msg = msg.Replace("EVENT_NAME", task.Name);
                msg = msg.Replace("EVENT_TIME", task.Time);
                mailMessage.Body = msg;
                mailMessage.IsBodyHtml = true;

                try {
                    client.Send(mailMessage);
                } catch(Exception e) {
                    Console.WriteLine(e);
                }

                task.Notified = true;
                repository.AddTask(task);
            }
            return System.Threading.Tasks.Task.CompletedTask;
        }
    }
}