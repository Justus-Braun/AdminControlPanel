using AdminControlPanel.Database.Models;
using LinqToDB;

namespace AdminControlPanel.Database
{
    public class DbLoger : LinqToDB.Data.DataConnection
    {
        public DbLoger() : base("loger") { }

        public ITable<User> User => GetTable<User>();

        public ITable<Characters> Characters => GetTable<Characters>();

        public ITable<TransferItem> TransferItems => GetTable<TransferItem>();
        public ITable<Admins> Admins => GetTable<Admins>();
    }
}
