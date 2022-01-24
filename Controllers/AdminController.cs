using Microsoft.AspNetCore.Mvc;
using AdminControlPanel.Database;
using AdminControlPanel.Database.Models;


namespace AdminControlPanel.Controllers
{
    [Route("api/admins")]
    [ApiController]
    public class AdminController : Controller
    {
        [HttpGet("all")]
        public IEnumerable<Admins> Index()
        {
            using (var db = new DbLoger())
            {
                var query = from a in db.Admins select a;
                return query.ToArray();
            }
        }

    }
}