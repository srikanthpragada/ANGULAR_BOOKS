import { Component, ViewChild} from '@angular/core';
import { Book } from './Book';
import { HttpClient} from "@angular/common/http"
import { Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup} from '@angular/forms';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

@Component({

    templateUrl: 'add-book.component.html'
})
export class AddBookComponent {
    book : Book;
    done : boolean;
    added : boolean = false; 
    @ViewChild('bookForm') bookForm : FormGroup; 
    
    constructor(private http: HttpClient) {
      this.book = new Book();
    }

    ngOnInit() {
        console.log("Dirty : " + this.bookForm.dirty);
    }
    
    isDirty() {
        return   this.bookForm.dirty && !this.done;
    }

    addBook()  {
         // call service 
          this.done = false;
          this.added = false; 
          this.http.post("http://test.srikanthpragada.com/api/books", this.book)
            .finally( () => { this.done = true; } )
            .catch(this.handleError)
            .subscribe(result => {
                 this.added = true;
            });
    }

   handleError(response) 
   {
       console.log(response);
       this.added = false; 
      //  this.message = response.statusText;
       return Observable.throw(response.statusText);
   }

}