using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using KidApi.Data;
using KidApi.Models;

using System.IO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace KidApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FileController : Controller
    {
        private DataContext _context;

        public FileController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            var orderFile = await _context.OrderFiles.FirstOrDefaultAsync(f => f.Id == id);
            if (orderFile == null)
            {
                return BadRequest();
            }
            var filePath = Path.Combine(@"d:\files\", $"file{orderFile.Id}{orderFile.Extention}");

            try
            {
                var stream = new FileStream(System.IO.Path.Combine(@"d:\files\", $"file{orderFile.Id}{orderFile.Extention}"), FileMode.Open);
                return File(stream, orderFile.ContentType, orderFile.FileName);
            }
            catch (System.Exception)
            {

                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(int orderId, IFormFile file)
        {
            var orderFile = new OrderFile() { OrderId = orderId, FileName = file.FileName, Extention = Path.GetExtension(file.FileName), ContentType = file.ContentType };
            _context.OrderFiles.Add(orderFile);
            await _context.SaveChangesAsync();

            try
            {
                var filePath = Path.Combine(@"d:\files\", $"file{orderFile.Id}{orderFile.Extention}");
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
            catch (System.Exception)
            {
                _context.OrderFiles.Remove(orderFile);
                await _context.SaveChangesAsync();
                return Json(new { id = -1 });
            }


            return Json(orderFile);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var orderFile = await _context.OrderFiles.Include(i => i.Order).FirstOrDefaultAsync(f => f.Id == id);
            if (orderFile == null)
            {
                return BadRequest();
            }
            var userId = Int32.Parse(User.Claims.FirstOrDefault(w => w.Type == "userId").Value);
            var userRole = Int32.Parse(User.Claims.FirstOrDefault(w => w.Type == "userRole").Value);

            if (orderFile.Order.AuthorId != userId || userRole != 3)
            {
                return BadRequest();
            }

            _context.OrderFiles.Remove(orderFile);
            await _context.SaveChangesAsync();

            

            var filePath = Path.Combine(@"d:\files\", $"file{orderFile.Id}{orderFile.Extention}");
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            return Ok();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch([FromRoute]int id)
        {
            var order = await _context.Orders.Include(i => i.OrderFiles).FirstOrDefaultAsync(w => w.Id == id);
            var userId = Int32.Parse(User.Claims.FirstOrDefault(w => w.Type == "userId").Value);
            if (order == null || order.AuthorId != userId)
            {
                return BadRequest();
            }
            var files = order.OrderFiles.Where(w => w.Confirmed == false);
            if (files != null)
            {
                _context.OrderFiles.RemoveRange(files);
                await _context.SaveChangesAsync();
            }

            foreach (var f in order.OrderFiles)
            {
                var filePath = Path.Combine(@"d:\files\", $"file{f.Id}{f.Extention}");
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }


            return Ok();
        }

    }

}