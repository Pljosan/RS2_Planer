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

namespace Planer.Controllers {

    [Route("api/[controller]")]
    public class LinkMonitorController : Controller {

        [HttpGet("[action]")]
        
        //JsonResult
        public async Task<JsonResult> getModifyDate() {

            Dictionary<string, object> res = new Dictionary<string, object>();

            using (HttpClient client = new HttpClient()) {
                const string url = "http://poincare.matf.bg.ac.rs/~smalkov/";
                StringBuilder sb = new StringBuilder();
                List<string> additions = new List<string>();
                List<string> removals = new List<string>(); 
                List<string> changes = new List<string>(); 

                using (HttpResponseMessage response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead)) {
                

                        string filePath = "../../user1/smalkov.html";
                        if (System.IO.File.Exists(filePath)) {
                            
                            string newText = await response.Content.ReadAsStringAsync();
                            string oldText = await System.IO.File.ReadAllTextAsync(filePath);

                            var d = new Differ();
                            var builder = new InlineDiffBuilder(d);
                            var result = builder.BuildDiffModel(oldText, newText);

                            foreach (var line in result.Lines) {
                                if (line.Type == ChangeType.Inserted) {
                                    additions.Add(line.Text);
                                }
                            }
                        }

                        Stream resFile = System.IO.File.Open("../../user1/test.html", FileMode.Create);
                        StreamWriter resFileWriter = new StreamWriter(resFile);
                        resFileWriter.Write(sb.ToString());
                        resFileWriter.Close();

                        using (Stream streamToWriteTo = System.IO.File.Open(filePath, FileMode.Create))
                        {
                            Stream webStream = await response.Content.ReadAsStreamAsync();
                            await webStream.CopyToAsync(streamToWriteTo);
                        }
                    
                }
                res.Add("result", true);
                res.Add("additions", additions);
            }

            return Json(res);
        }
    }
}