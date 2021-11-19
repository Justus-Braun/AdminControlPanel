using AdminControlPanel.Database.Models;
using LinqToDB;

namespace AdminControlPanel.Database
{
    public class DbLoger : LinqToDB.Data.DataConnection
    {
        public DbLoger() : base("loger") { }

        public ITable<User> User => GetTable<User>();

        public static List<User> All()
        {
            using (var db = new DbLoger())
            {
                var query = from u in db.User
                            select u;
                return query.ToList();
            }
        }
    }
}
