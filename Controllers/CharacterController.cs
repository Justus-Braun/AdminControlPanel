using Microsoft.AspNetCore.Mvc;
using AdminControlPanel.Database.Models;
using AdminControlPanel.Database;
using AdminControlPanel.Handler;

namespace AdminControlPanel.Controllers
{
    [Route("api/character")]
    [ApiController]
    public class CharacterController : Controller
    {
        [HttpGet("all")]
        public IActionResult Index()
        {
            if (!AuthenticationHandler.IsAutherised(Request))
                return BadRequest();

            using var db = new DbLoger();
            var query = from c in db.Characters select c;
            return Ok(query.ToArray());
        }

        [HttpGet("id")]
        public IEnumerable<string> Index(int source)
        {
            using var db = new DbLoger();

            var query = from c in db.Characters where c.Id == source select c.Identifer;

            return query.ToArray();
        }
    }
}
