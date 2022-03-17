using AdminControlPanel.Database;
using AdminControlPanel.Database.Models;

namespace AdminControlPanel.Handler
{
    public class AuthenticationHandler
    {
        private const string CookieName = "acpuid";
        public static bool IsAutherised(HttpRequest httpRequest)
        {
            string? cookieValue = httpRequest.Cookies[CookieName];
            if (cookieValue == null)
                return false;

            using var db = new DbLoger();
            return db.Accounts.Any(a => a.TempId == cookieValue);
        }

        public static void SetAuthCookie(HttpResponse response, string value)
        {
            var cookieOptions = new CookieOptions
            {
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.None
            };

            response.Cookies.Append(CookieName, value, cookieOptions);
        }
    }
}
