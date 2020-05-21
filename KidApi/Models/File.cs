using System;
using System.Text.Json.Serialization;

namespace KidApi.Models
{
    public class File
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
        public string Extention { get; set; }
    }
}