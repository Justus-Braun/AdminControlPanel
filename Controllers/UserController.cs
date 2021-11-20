using Microsoft.AspNetCore.Mvc;
using AdminControlPanel.Database;
using AdminControlPanel.Database.Models;

namespace AdminControlPanel.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<User> Index()
        {
            Console.WriteLine("test");
            using (var db = new DbLoger())
            {
                var query = from u in db.User
                            select u;
                return query.ToArray();
            }
        }
    }
}