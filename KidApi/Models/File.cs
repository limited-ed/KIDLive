using System;

namespace KidApi.Models
{
    public class File
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public string Extention { get; set; }
    }
}