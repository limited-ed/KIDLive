using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace KidApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public int ToUserId { get; set; }
        public IdentityUser ToUser { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string OrderText { get; set; }
        public string Answer { get; set; }
        public List<File> Files { get; set; }
        public int Status { get; set; }          
        public DateTime? CloseDate { get; set; }
    }
}