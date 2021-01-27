using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace KidApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public Author Author { get; set; }
        public int DivisionId { get; set; }
        public Division Division { get; set; }
//        public int ToUserId { get; set; }
//        public Author ToUser { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string ShortText { get; set; }
        public string OrderText { get; set; }
        public string RejectText { get; set; }
        public string Answer { get; set; }
        public List<OrderFile> OrderFiles { get; set; }
        public int StatusId { get; set; }          
        public Status Status { get; set; }
        public DateTime? CloseDate { get; set; }
    }
}