import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayerGuard implements CanActivate {
  constructor(
    private router: Router
  ){}

  canActivate() {
    if (localStorage.getItem('currentFile')) {
      return true;
    }
    return this.router.navigate(['/Liste-de-chansons']);
  }
}
