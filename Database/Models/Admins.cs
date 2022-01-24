using System;
using LinqToDB.Mapping;

namespace AdminControlPanel.Database.Models
{
    [Table(Name = "admins")]
    public class Admins
    {
        [Column(Name = "id"), NotNull]
        public string Id { get; set; }
        
        [Column(Name = "password")]
        public string Password { get; set; }
    }
}