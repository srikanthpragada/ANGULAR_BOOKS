import { Component, Input } from '@angular/core';
import { Book } from './Book';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'book-update.component.html'
})
export class BookUpdateComponent {
  id: number;
  book: Book;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    // get book details 
    this.http.get<Book>("http://test.srikanthpragada.com/api/books/" + this.id)
      .subscribe(resp => this.book = resp);
  }

  updateBook() {
    // call service 
    this.http.put("http://test.srikanthpragada.com/api/books/" + this.book.Id, this.book)
      .catch(this.handleError)
      .subscribe(result => {
        alert("Book Updated!");
      });
  }

  handleError(response) {
    console.log(response);
    alert("Sorry! Book could not be updated!");
    return Observable.throw(response.statusText);
  }

}   