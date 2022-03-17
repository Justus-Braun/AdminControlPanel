using System.Security.Cryptography;
using System.Text;
using AdminControlPanel.Controllers.RequestModels;
using AdminControlPanel.Database;
using AdminControlPanel.Database.Models;
using AdminControlPanel.Handler;
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
                string userToken = GetTempIdFromAccount(data.username, data.password);
                
                AuthenticationHandler.SetAuthCookie(HttpContext.Response, userToken);
            }
            catch
            {
                return Ok(new {message = "No User Found"});
            }

            return Ok(new {});
        }

        private static string GetTempIdFromAccount(string username, string password)
        {
            using var db = new DbLoger();
            foreach (var account in db.Accounts)
            {
                if (account.Username == username && account.Password == password)
                {
                    if (account.TempId == null)
                    {
                        account.TempId = ComputeSha256Hash(username + DateTime.Now.Ticks);
                    }

                    return account.TempId;
                }
            }

            throw new Exception("User not found");
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
