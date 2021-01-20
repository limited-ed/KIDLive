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
                /*if (!_context.Divisions.Any())
                {
                    _context.Divisions.Add( new Division { Title = "Подразделение 1"});
                    _context.Divisions.Add( new Division { Title = "Подразделение 2"});
                    _context.Divisions.Add( new Division { Title = "Подразделение 3"});
                    _context.Divisions.Add( new Division { Title = "Подразделение 4"});
                    _context.SaveChanges();
                }*/
                if (!_context.Users.Any())
                {
                    _context.Users.Add(new IdentityUser() { Login = "admin", PasswordHash = "password".GetHash(), UserName="Администратор", RoleId = 3, DivisionId = 1});
              //      _context.Users.Add(new IdentityUser() { Login = "pto", PasswordHash = "password".GetHash(), UserName="ВЧПО", RoleId = 1, DivisionId = 1});
              //      _context.Users.Add(new IdentityUser() { Login = "to", PasswordHash = "password".GetHash(), UserName="ВЧДТ", RoleId = 2, DivisionId = 1});
                    _context.SaveChanges();
                }
                if (!_context.Statuses.Any())
                {
                    _context.Statuses.Add( new Status() { Id=1, Title="Не прочитано"});
                    _context.Statuses.Add( new Status() { Id=2, Title="На исполнении"});
                    _context.Statuses.Add( new Status() { Id=3, Title="На согласовании"});
                    _context.Statuses.Add( new Status() { Id=4, Title="Отклонено"});
                    _context.Statuses.Add( new Status() { Id=5, Title="Закрыто"});
                    _context.SaveChanges();
                }

                if(!_context.Authors.Any())
                {
                    _context.Authors.Add( new Author() { Name = "Администратор"});
                   // _context.Authors.Add( new Author() { Name = "ВЧПО"});
                   // _context.Authors.Add( new Author() { Name = "ВЧДТ"});
                }

                if(!_context.Orders.Any())
                {
                   /* _context.Orders.Add(new Order() 
                    {
                        AuthorId = 3,
                        DivisionId = 1,
                        ToUserId = 2,
                        StartDate = new DateTime(2020,05,20),
                        EndDate = new DateTime(2020,06,20),
                        OrderText = "Починить там что-то",
                        ShortText = "Починить там что-то",
                        StatusId = 1
                    });

                    _context.SaveChanges();
*/
                }

            }
            catch (System.Exception)
            {
                
                throw;
            }
        }    
    }
}