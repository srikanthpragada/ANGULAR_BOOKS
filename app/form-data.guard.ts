import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AddBookComponent } from './add-book.component';
@Injectable()
export class FormDataGuard implements CanDeactivate<AddBookComponent> {
    canDeactivate(
        component: AddBookComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    )
    {
        if (component.isDirty())
        {
            return confirm("Do you want to leave this page?");
        }
        return true;
    }
}
