using LinqToDB.Mapping;

namespace AdminControlPanel.Database.Models
{
    [Table(Name = "characters")]
    public class Characters
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }

        [Column(Name = "charid"), NotNull]
        public int CharId { get; set; }

        [Column(Name = "identifer"), NotNull]
        public string Identifer { get; set; }

        [Column(Name = "firstname")]
        public string FirstName { get; set; }

        [Column(Name = "lastname")]
        public string LastName { get; set; }

        [Column(Name = "dataofbirth")]
        public DateTime Birthday { get; set; }

        [Column(Name = "money")]
        public int Money { get; set; }

        [Column(Name = "bank")]
        public int Bank { get; set; }

        [Column(Name = "state")]
        public int State { get; set; }
    }
}
