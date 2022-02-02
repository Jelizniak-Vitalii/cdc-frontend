import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PlayerGuard implements CanActivate {
  constructor(
    private router: Router,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentFile')) {
      return true;
    } else {
     return this.router.navigate(['/Liste-de-chansons']);
    }
  }
}
