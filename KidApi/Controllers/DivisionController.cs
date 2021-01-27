using System;
using System.Collections.Generic;
using KidApi.Data;
using KidApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KidApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DivisionController
    {
        private DataContext _context;

        public DivisionController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Division> Get()
        {
            return _context.Divisions;
        }

    }
    
}