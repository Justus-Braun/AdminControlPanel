using AdminControlPanel.Database;
using LinqToDB.Mapping;

namespace AdminControlPanel.Database.Models
{
    [Table(Name = "TransferItems")]
    public class TransferItem
    {
        [Column(Name = "id")]
        public int Id { get; set; }

        [Column(Name = "source")]
        public int Source { get; set; }

        [Column(Name = "target")]
        public int Target { get; set; }

        [Column(Name = "item")]
        public string Item { get; set; }
    }
}
