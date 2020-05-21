using System;
using System.Collections.Generic;
using System.Linq;
using KidApi.Data;
using KidApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KidApi.Controllers
{
    [Route("api/[controller]")]
    public class OrderController
    {
        private DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            return _context.Orders.Include(i => i.Author).Include( i => i.Division).Include( i => i.Files).Include( i => i.ToUser).Include( i => i.Status);
        }

    }
    
}