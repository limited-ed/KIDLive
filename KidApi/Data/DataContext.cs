using System;
using KidApi.Models;
using Microsoft.EntityFrameworkCore;

namespace KidApi.Data
{
    public class DataContext: DbContext
    {
        public DataContext()
        {

        }

        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }


        public DbSet<Order> Orders { get; set; }
        public DbSet<IdentityUser> Users { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Division> Divisions { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Status> Statuses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUser>().HasKey( k => k.Id );
            modelBuilder.Entity<IdentityUser>().HasOne( o => o.Division);
            modelBuilder.Entity<File>().HasKey( k => k.Id );
            modelBuilder.Entity<Order>().HasKey( k => k.Id );
            modelBuilder.Entity<Order>().HasMany( m => m.Files).WithOne( o => o.Order);
            modelBuilder.Entity<Order>().HasOne( o => o.Division);
            modelBuilder.Entity<Order>().HasOne( o => o.Author);
            modelBuilder.Entity<Order>().HasOne( o => o.Status);
        }
                
    }

}