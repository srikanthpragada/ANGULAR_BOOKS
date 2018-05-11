using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using testmvc.Models;

namespace testmvc.Controllers
{
    [EnableCors ("*","*","GET,POST,DELETE,PUT")]
    public class BooksController : ApiController
    {

        public List<Book>  GetAllBooks()
        {
            CatalogContext ctx = new CatalogContext();
            return ctx.Books.ToList();
        }


        public IHttpActionResult GetBook(int id)
        {
            CatalogContext ctx = new CatalogContext();
            var book = (from b in ctx.Books.ToList()
                       where b.Id == id
                       select b).SingleOrDefault();
            if (book == null)
                return NotFound();
            else
                return Ok<Book>(book);


        }

        // Insert new book
        [HttpPost] 
        public IHttpActionResult Post(Book book)
        {
            try
            {
                CatalogContext ctx = new CatalogContext();
                ctx.Books.Add(book);
                ctx.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                // send 500 error
                HttpResponseMessage msg = new HttpResponseMessage();
                msg.StatusCode = HttpStatusCode.InternalServerError;
                msg.ReasonPhrase = "Error while adding book  -> " + ex.Message;
                return this.BadRequest();
            }

        }
        // Update existing book - id is bookid 
        [HttpPut]
        public IHttpActionResult Put(int id, Book book)
        {
            CatalogContext ctx = new CatalogContext();
            var dbbook = (from b in ctx.Books
                          where b.Id == id
                          select b).SingleOrDefault();

            if (dbbook != null)
            {
                dbbook.Title = book.Title;
                dbbook.Price = book.Price;
                ctx.SaveChanges();
                return Ok();
            }
            else
            {
                // send 404 error
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                CatalogContext ctx = new CatalogContext();
                var book = (from b in ctx.Books.ToList()
                            where b.Id == id
                            select b).SingleOrDefault();
                if (book == null)
                    return NotFound();

                ctx.Books.Remove(book);
                ctx.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return this.BadRequest();
            }
        }


    }
}
