import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'books',
  templateUrl: 'main.component.html'
})
export class MainComponent {


  constructor(private router: Router) {

  }

  search(title: string) {
    this.router.navigate(['/search', title]);
  }
}
