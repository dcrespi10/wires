import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdmissionsComponent } from '../admissions/admissions.component';
import { CentreComponent } from '../centre/centre.component';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

export class ConfirmDeactivateGuard implements CanDeactivate<AdmissionsComponent> {

  canDeactivate(target: AdmissionsComponent) {
    if(target.hasChanges()){
        return window.confirm('Data have been modified. Do you really want to exit?');
    }
    return true;
  }
}

export class ConfirmDeactivateCentreGuard implements CanDeactivate<CentreComponent> {

    canDeactivate(target: CentreComponent) {
      if(target.hasChanges()){
          return window.confirm('Data have been modified. Do you really want to exit?');
      }
      return true;
    }
  }