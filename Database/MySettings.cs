using LinqToDB;
using LinqToDB.Configuration;

namespace AdminControlPanel.Database
{
    public class MySettings : ILinqToDBSettings
    {
        public IEnumerable<IDataProviderSettings> DataProviders
        {
            get { yield break; }
        }

        public static string Conf { get; set; }

        public string DefaultConfiguration => "loger"; // lets set your configuration as default, so you can call just new DataContext() or new DataConnection()
        public string DefaultDataProvider => ProviderName.MySql; // and set default database type

        public IEnumerable<IConnectionStringSettings> ConnectionStrings
        {
            get
            {
                yield return

                    new ConnectionStringSettings
                    {
                        Name = "loger", // This is configuration name, you pass it to DataConnection constructor
                        ProviderName = ProviderName.MySql, // here we are setting database we are working with
                        ConnectionString = Conf,
                    };
            }
        }
    }
}
