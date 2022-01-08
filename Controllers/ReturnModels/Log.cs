namespace AdminControlPanel.Controllers.ReturnModels
{
    public class Log
    {
        public Log(int id, string type, string data, DateTime timestamp, int source)
        {
            Id = id;
            Source = source;
            Data = data;
            Type = type;
            Timestamp = timestamp;
        }

        public Log(int id, string type, string data, DateTime timestamp, int source, int target) 
            : this(id, type, data, timestamp, source)
        {
            Target = target;
        }

        public Log(int id, string type, string data, DateTime timestamp, int source, string sourceName) 
            : this(id, type, data, timestamp, source)
        {
            SourceName = sourceName;
        }
        
        public Log(int id, string type, string data, DateTime timestamp, int source, int target, string sourceName, string targetName) 
            : this(id, type, data, timestamp, source, target)
        {
            SourceName = sourceName;
            TargetName = targetName;
        }

        // Log id 
        public int Id { get; set; }

        // Char id
        public int Source { get; set; }

        public string SourceName { get; set; } = "";

        public int Target { get; set; } = -1;

        public string TargetName { get; set; } = "";

        // Log data
        public string Data { get; set; }

        public string Type { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
