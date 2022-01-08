using Microsoft.AspNetCore.Mvc;
using AdminControlPanel.Database.Models;
using AdminControlPanel.Database;

namespace AdminControlPanel.Controllers
{
    [Route("api/character")]
    [ApiController]
    public class CharacterController : Controller
    {
        [HttpGet("all")]
        public IEnumerable<Characters> Index()
        {
            using (var db = new DbLoger())
            { 
                var query = from c in db.Characters select c;
                return query.ToArray();
            }
        }
    }
}
