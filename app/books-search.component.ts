import { Component } from '@angular/core';
import { Book } from './Book';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient} from "@angular/common/http"
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { BookUtils } from './BookUtils';

import 'rxjs/add/operator/map';

@Component({
    templateUrl: 'books-list.component.html'
})
export class BooksSearchComponent {
    title: string;
    books: Book[];
    done : boolean;

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.title = params["title"];
            this.done = false;  
            this.http.get<Book[]>("http://test.srikanthpragada.com/api/books")
               .subscribe(resp => {
                    let books = <Book[]>resp;
                    // filter books
                    this.books = books.filter(b => b.Title.indexOf(this.title) >= 0);
                }, null, () => this.done = true)
        });
    }

     deleteBook(id : number) {
        var result = BookUtils.deleteBook(this.books, this.http,id);
        if ( result ) {
           alert("Book has been deleted!");
        }
    }

    updateBook(id : number) {
        this.router.navigate(["update", id]);
    }


}