using Microsoft.AspNetCore.Mvc;
using AdminControlPanel.Controllers.ReturnModels;
using AdminControlPanel.Database;

namespace AdminControlPanel.Controllers
{
    [Route("api/log")]
    public class LogController : Controller
    {
        [HttpGet("all")]
        public IEnumerable<Log> Index()
        {
            using (var db = new DbLoger())
            {
                List<Log> logs = new();
                logs.AddRange(from t in db.TransferItems select new Log(t.Id, "transferitem", t.Item, DateTime.Now, t.Source, t.Target));
                var chars = from c in db.Characters select c;

                foreach (var item in logs)
                {
                    foreach (var c in chars)
                    {
                        if (item.Source == c.Id)
                            item.SourceName = c.FirstName + " " + c.LastName;
                        if (item.Target == c.Id)
                            item.TargetName = c.FirstName + " " + c.LastName;
                    }        
                }

                return logs.ToArray();
            }
        }
    }
}