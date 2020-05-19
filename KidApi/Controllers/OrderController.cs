using System;
using KidApi.Data;
using Microsoft.AspNetCore.Mvc;

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


    }
    
}