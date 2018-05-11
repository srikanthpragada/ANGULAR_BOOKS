import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { BooksListComponent } from './books-list.component';
import { BookUpdateComponent } from './book-update.component';
import { AddBookComponent } from './add-book.component';
import { BooksSearchComponent } from './books-search.component';
import { MainComponent } from './main.component';

import { FormDataGuard } from './form-data.guard';

const appRoutes: Routes = [
  { path: 'add', component: AddBookComponent, 
                       canDeactivate : [ FormDataGuard] },
  { path: 'list', component: BooksListComponent },
  { path: 'update/:id', component:  BookUpdateComponent },
  { path: 'search/:title', component:  BooksSearchComponent },
  { path: '**',  redirectTo : "/list", pathMatch : 'full' }
];

@NgModule({
  declarations: [
      BooksListComponent, AddBookComponent , BookUpdateComponent,  
      BooksSearchComponent, MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    HttpClientModule, 
    RouterModule.forRoot(appRoutes)],

  providers: [ FormDataGuard ],
  bootstrap: [ MainComponent]
})
export class AppModule {

   
}
