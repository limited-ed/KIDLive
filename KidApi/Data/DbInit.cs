using System;
using System.Linq;
using KidApi.Common;
using KidApi.Models;

namespace KidApi.Data
{
    public class DbInit
    {
        private DataContext _context;
        public DbInit(DataContext context)
        {
            _context = context;
        }
        public void Init()
        {
            try
            {
                if (!_context.Divisions.Any())
                {
                    _context.Divisions.Add( new Division { Title = "Подразделение 1"});
                    _context.Divisions.Add( new Division { Title = "Подразделение 2"});
                    _context.Divisions.Add( new Division { Title = "Подразделение 3"});
                    _context.Divisions.Add( new Division { Title = "Подразделение 4"});
                    _context.SaveChanges();
                }
                if (!_context.Users.Any())
                {
                    _context.Users.Add(new IdentityUser() { Login = "admin", PasswordHash = "password".GetHash(), UserName="Администратор", RoleId = 4, DivisionId = 1});
                    _context.SaveChanges();
                }

            }
            catch (System.Exception)
            {
                
                throw;
            }
        }    
    }
}