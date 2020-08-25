using System;
using System.Text.Json.Serialization;

namespace KidApi.Models
{
    public class OrderFile
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
        public string Extention { get; set; }
        public bool Confirmed { get; set; }
    }
}