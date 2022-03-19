using System.Runtime.InteropServices.ComTypes;
using System.Security.Cryptography;
using System.Text;
using AdminControlPanel.Controllers.RequestModels;
using AdminControlPanel.Database;
using AdminControlPanel.Database.Models;
using AdminControlPanel.Handler;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Crmf;

namespace AdminControlPanel.Controllers
{
    [Route("api/account")]
    public class AccountController : Controller
    {
        [HttpPost]
        [Route("login")]
        [Consumes("application/json")]
        public IActionResult Login([FromBody] PostLogin data)
        {
            try
            {
                if (AuthenticationHandler.IsAutherised(HttpContext.Request))
                    return Ok(new { });

                string userToken = GetTempIdFromAccount(data);

                AuthenticationHandler.SetAuthCookie(HttpContext.Response, userToken);
            }
            catch (Exception e)
            {
                return Ok(new { message = e.Message });
            }

            return Ok(new { });
        }

        private static string GetTempIdFromAccount(PostLogin data)
        {
            return GetTempIdFromAccount(data.username, data.password);
        }

        private static string GetTempIdFromAccount(string username, string password)
        {
            using var db = new DbLoger();

            Accounts? account = db.Accounts.FirstOrDefault(a => a.Username == username && a.Password == password);

            if (account == null)
                throw new Exception("User not found");

            if (account.TempId != null)
                return account.TempId;


            string newTempId = ComputeSha256Hash(username + DateTime.Now.Ticks);

            db.Accounts.Where(a => a == account)
                        .Set(a => a.TempId, newTempId)
                        .Update();

            return newTempId;
        }

        private static string ComputeSha256Hash(string rawData)
        {
            using SHA256 sha256Hash = SHA256.Create();
            // ComputeHash - returns byte array  
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

            // Convert byte array to a string   
            StringBuilder builder = new StringBuilder();
            foreach (var b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString();
        }
    }
}
