import { Component } from '@angular/core';
import { Book } from './Book';
import { BookUtils } from './BookUtils';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
    templateUrl: 'books-list.component.html'
})
export class BooksListComponent {
    books: Book[];
    done: boolean;
    constructor(private http: HttpClient, private router: Router) {
        this.books = [];
    }

    ngOnInit() {
        this.done = false;
        this.http.get<Book[]>("http://test.srikanthpragada.com/api/books")
            .subscribe(data => this.books = data, null,
                () => this.done = true);
    }

    deleteBook(id: number) {
        if(! confirm("Do you want to delete book with id [" + id + "] ?"))
           return;

        this.http.delete("http://test.srikanthpragada.com/api/books/" + id)
            .subscribe(result => {
                // find out book in the array and delete
                for (var i = 0; i < this.books.length; i++) {
                    if (this.books[i].Id == id) {
                        this.books.splice(i, 1);
                        alert("Deleted book successfully!")
                    }
                }
            },
                (ex) => { alert("Sorry! Could not delete book!") }
            );

    }

    updateBook(id: number) {
        this.router.navigate(["update", id]);
    }

}