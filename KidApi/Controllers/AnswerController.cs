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
using System.IO;

namespace KidApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AnswerController:  Controller
    {
        private DataContext _context;
        public AnswerController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Answer answer)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(f => f.Id == answer.Id);
            if (order == null){
                return BadRequest();
            }

            order.Answer = answer.AnswerText;
            order.StatusId = 3;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }

}