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

        [HttpGet("[action]")]
        public async Task<JsonResult> getModifyDate() {

            Dictionary<string, object> res = new Dictionary<string, object>();

                
            var tasks = linkRepository.Links.Select(l => getUrlChanges(l));
            var results = await System.Threading.Tasks.Task.WhenAll(tasks);

            res.Add("result", true);
            res.Add("additions", changesPerUrl);

            return Json(res);
        }

        [HttpPost("[action]")]
        public JsonResult AddNewLink(LinkViewModel linkViewModel) {

            User user = userRepository.Users.FirstOrDefault(u => u.UserID == linkViewModel.UserID);
            Link link = new Link { User = user, Url = linkViewModel.Url, PathToFile = "test" };

            linkRepository.Save(link);
            return Json("jej");

        }


        private async Task<Boolean> getUrlChanges(Link link) {
            

            using (HttpClient client = new HttpClient()) {
            
                using (HttpResponseMessage response = await client.GetAsync(link.Url, HttpCompletionOption.ResponseHeadersRead)) {
            
                    if (System.IO.File.Exists(link.PathToFile)) {
                        
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
                    foreach (var addition in additions) {
                        res.Add(addition);
                    }
                    changesPerUrl.Add(link.Url, res);
                    additions.Clear();
                }
            }

            return true;
        }
    }
}