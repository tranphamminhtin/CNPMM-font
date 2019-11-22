import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeeGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      var user = JSON.parse(sessionStorage.getItem('user'));
      if (user.quyen === 0)
        return true;
      else {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        this.router.navigate(['/dang-nhap']);
        return false;
      }
    } else {
      this.router.navigate(['/dang-nhap']);
      return false;
    }
  }

}
