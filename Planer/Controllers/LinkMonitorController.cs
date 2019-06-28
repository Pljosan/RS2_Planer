using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Net;
using System.Net.Http;
using System.IO;
using System.Threading.Tasks;
using DiffPlex;
using DiffPlex.DiffBuilder;
using DiffPlex.DiffBuilder.Model;
using System.Text;

using Planer.Models;
using Planer.Models.ViewModels;

namespace Planer.Controllers {

    [Route("api/[controller]")]
    public class LinkMonitorController : Controller {

        private ILinkRepository linkRepository;
        private IUserRepository userRepository;
        private Dictionary<string, List<string>> changesPerUrl = new Dictionary<string, List<string>>();
        private List<string> additions = new List<string>();

        public LinkMonitorController(ILinkRepository repository, IUserRepository userRepository)
        {
            this.linkRepository = repository;
            this.userRepository = userRepository;
        }

        [HttpGet("[action]/{userId}")]
        public async Task<JsonResult> getModifyDate(long userId) {

            Dictionary<string, object> res = new Dictionary<string, object>();

                
            var tasks = linkRepository.Links.Where(l => l.User.UserID == userId).Select(l => getUrlChanges(l));
            var results = await System.Threading.Tasks.Task.WhenAll(tasks);

            res.Add("result", true);
            res.Add("additions", changesPerUrl);

            return Json(res);
        }

        [HttpPut("[action]/{userId}")]
        public JsonResult AddNewLink(int id, LinkViewModel linkViewModel) {
            Dictionary<string, object> res = new Dictionary<string, object>();

            User user = userRepository.Users.FirstOrDefault(u => u.UserID == linkViewModel.UserID);
            string userLinkFolder = user.LinkFolderLocation;
            Link link = new Link { User = user, Url = linkViewModel.Url, PathToFile = "" };

            linkRepository.Save(link);

            Console.Write(link.LinkID);
            string pathToFile = userLinkFolder + link.LinkID + ".html";
            link.PathToFile = pathToFile;
            linkRepository.Save(link);

            res.Add("result", true);
            return Json(res);

        }

        // [HttpPost("[action]")]
        // [FromBody] User user
        [HttpGet("[action]/{userId}")]
        public JsonResult GetLinks(long userId) {
            Dictionary<string, object> res = new Dictionary<string, object>();

            Console.WriteLine("user " + userId);

            var links = linkRepository.Links.Where(l => l.User.UserID == userId); //.Select(l => l.Url)
            var linkArray = links.ToArray();
            Console.WriteLine("links:");
            Console.WriteLine(linkArray.Length);

            res.Add("result", true);
            res.Add("links", linkArray);
            return Json(res);

        }

        [HttpDelete("[action]/{linkId}")]
        public JsonResult deleteLink(long linkId) {
            Dictionary<string, object> result = new Dictionary<string, object>();
            
            Console.WriteLine("deleting " + linkId);

            var linkToBeDeleted = linkRepository.Links.FirstOrDefault(l => l.LinkID == linkId);

            System.IO.File.Delete(linkToBeDeleted.PathToFile);            
            linkRepository.Delete(linkToBeDeleted);
            linkRepository.Save();
            
            result.Add("result", true);
            return Json(result);
        }

        private async Task<Boolean> getUrlChanges(Link link) {
            

            using (HttpClient client = new HttpClient()) {
            
                using (HttpResponseMessage response = await client.GetAsync(link.Url, HttpCompletionOption.ResponseHeadersRead)) {
            
                    Boolean shouldAdd = false;
                    if (System.IO.File.Exists(link.PathToFile)) {
                        
                        shouldAdd = true;
                        string newText = await response.Content.ReadAsStringAsync();
                        string oldText = await System.IO.File.ReadAllTextAsync(link.PathToFile);

                        var d = new Differ();
                        var builder = new InlineDiffBuilder(d);
                        var result = builder.BuildDiffModel(oldText, newText);

                        foreach (var line in result.Lines) {
                            if (line.Type == ChangeType.Inserted) {
                                additions.Add(line.Text);
                            }
                        }
                    }

                    using (Stream streamToWriteTo = System.IO.File.Open(link.PathToFile, FileMode.Create))
                    {
                        Stream webStream = await response.Content.ReadAsStreamAsync();
                        await webStream.CopyToAsync(streamToWriteTo);
                    }

                    List<string> res = new List<string>();
                    if (shouldAdd) {
                        foreach (var addition in additions) {
                            res.Add(addition);
                        }
                    }
                    changesPerUrl.Add(link.Url, res);
                    additions.Clear();
                }
            }

            return true;
        }
    }
}