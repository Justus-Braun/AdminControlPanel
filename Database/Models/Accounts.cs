using LinqToDB.Mapping;

namespace AdminControlPanel.Database.Models
{
    [Table(Name = "accounts")]
    public class Accounts
    {
        [Column(Name = "id")]
        public int Id { get; set; }
        
        [Column(Name = "username")]
        public string? Username { get; set; }
        
        [Column(Name = "password")]
        public string? Password { get; set; }

        [Column(Name = "tempid")]
        public string? TempId { get; set; }

        [Column(Name = "role")]
        public string? Role { get; set; }
    }
}
