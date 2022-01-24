using Microsoft.AspNetCore.Mvc;
using AdminControlPanel.Database;
using AdminControlPanel.Database.Models;
using AdminControlPanel.Controllers.ReturnModels;

namespace AdminControlPanel.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {

        [HttpGet("all")]
        public IEnumerable<UserCharCount> Index()
        {
            Console.WriteLine("Select Users from Database");
            using (var db = new DbLoger())
            {

                var chars = from c in db.Characters select c;
                var query = from u in db.User join c in chars on u.Identifer equals c.Identifer into cu select new UserCharCount { Identifer = u.Identifer, CharCount = cu.Count() };

                return query.ToArray();
            }
        }

        [HttpGet("id")]
        public IEnumerable<Characters> GetUser(string identifer)
        {
            using (var db = new DbLoger())
            {
                var chars = from c in db.Characters where c.Identifer == identifer select c;

                return chars.ToArray();
            }
        }
    }
}