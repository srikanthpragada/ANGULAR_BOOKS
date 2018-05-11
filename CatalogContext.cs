using System.Configuration;
using System.Data.Entity;


/*
 
create table books
( Id int identity primary key,
  Title varchar(50),
  Price int
)

*/

namespace testmvc.Models
{
    public class CatalogContext : DbContext 
    {
        public CatalogContext() : base( ConfigurationManager.ConnectionStrings["mssqlserver"].ConnectionString)
        {

        }

        public DbSet<Book>  Books { get; set; }


        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //    modelBuilder.Entity<Book>().Property( e => e.Id).
        //}
        

      

    }
}
