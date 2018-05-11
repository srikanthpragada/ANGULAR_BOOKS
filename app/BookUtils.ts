import { Component } from '@angular/core';
import { Book } from './Book';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export class BookUtils {
    static deleteBook(books: Book[], http: HttpClient, id: number) {
        // debugger;
        var resp = confirm("Do you want to delete book with id [" + id + "] ?");

        if (resp) {
            http.delete("http://test.srikanthpragada.com/api/books/" + id)
                .subscribe(result => {
                    // find out book in the array and delete
                    for (var i = 0; i < books.length; i ++) {
                       if( books[i].Id == id) {
                            books.splice(i,1);
                            return true; 
                       }
                           
                    }
                    return false; 
                },
                (ex) => { return false }
            );
        }
        else
            return false;
    } // deleteBook 
}