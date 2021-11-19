using System;
using LinqToDB.Mapping;

namespace AdminControlPanel.Database.Models
{
    [Table(Name = "user")]
    public class User
    {
        [PrimaryKey]
        public string Identifer { get; set; }
    }
}
