using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KidApi.Data;
using KidApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
namespace KidApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class OrderController: Controller
    {
        private DataContext _context;

        public OrderController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            return _context.Orders.Include(i => i.Author).Include( i => i.Division).Include( i => i.OrderFiles).Include( i => i.ToUser).Include( i => i.Status);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder([FromRoute] int id, [FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.Id)
            {
                return BadRequest();
            }
            _context.Entry(order).State = EntityState.Modified;
            foreach (var f in _context.OrderFiles.Where( w => w.OrderId==order.Id && !w.Confirmed))
            {
                f.Confirmed = true;
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(o => o.Id == id);
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostOrder([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userByDiv = _context.Users.FirstOrDefault(f => f.DivisionId == order.DivisionId);
            if (userByDiv != null)
            {
                order.ToUserId = userByDiv.Id;
            }
            order.StartDate = DateTime.Now;
            _context.Orders.Add(order);
            try
            {
               await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            var newOrder = _context.Orders.Include(i => i.Author).Include( i => i.Division)
                .Include( i => i.OrderFiles).Include( i => i.ToUser).Include( i => i.Status).FirstOrDefault(f => f.Id == order.Id);

            return Ok(newOrder);
        }

    }
    
}