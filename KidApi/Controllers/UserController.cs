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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Admin")]
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<IdentityUser> GetUsers()
        {
            var list=_context.Users;
            return list;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIdentityUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identityUser = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);

            if (identityUser == null)
            {
                return NotFound();
            }

            return Ok(identityUser);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIdentityUser([FromRoute] int id, [FromBody] IdentityUser identityUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != identityUser.Id)
            {
                return BadRequest();
            }
            _context.Entry(identityUser).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IdentityUserExists(id))
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

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostIdentityUser([FromBody] IdentityUser identityUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //identityUser.Divisions = _context.Divisions.ToList();
            _context.Users.Add(identityUser);
            try
            {
               await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }


            return Ok(identityUser);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIdentityUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identityUser = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (identityUser == null)
            {
                return NotFound();
            }

            _context.Users.Remove(identityUser);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(identityUser);
        }

        private bool IdentityUserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}