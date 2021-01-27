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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IEnumerable<Order> GetAll()
        {
            var orders = _context.Orders.Include(i => i.Author).Include( i => i.Division).Include( i => i.OrderFiles).Include( i => i.Status).AsQueryable();
            if (!User.HasClaim("Controller", "true"))
            {
                var userId = Int32.Parse(User.FindFirst("userId").Value);
                var user = _context.Users.FirstOrDefault(f => f.Id == userId);
                orders = orders.Where(w => w.DivisionId == user.DivisionId);
            }

            return orders;
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy="Controller")]
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy="Controller")]
        public async Task<IActionResult> PostOrder([FromBody] Order order)
        {
            var userRole = Int32.Parse(User.Claims.FirstOrDefault(w => w.Type=="userRole").Value);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = Int32.Parse(User.Claims.FirstOrDefault(w => w.Type=="userId").Value);
            var user = _context.Users.FirstOrDefault(f => f.Id == userId);
            if (user != null)
            {
                order.Author = _context.Authors.FirstOrDefault( f => f.Id == userId);
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
                .Include( i => i.OrderFiles).Include( i => i.Status).FirstOrDefault(f => f.Id == order.Id);

            return Ok(newOrder);
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy="Controller")]
        public async Task<IActionResult> Deleteorder([FromBody]int id)
        {
            var order = await _context.Orders.SingleOrDefaultAsync(s => s.Id == id);
            if (order == null) 
            {
                return NotFound();
            }
            _context.Orders.Remove(order);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (System.Exception)
            {
                
                throw;
            }
            return Ok();
        }
    }    
}