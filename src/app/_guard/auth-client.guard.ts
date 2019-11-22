import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthClientGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      var user = JSON.parse(sessionStorage.getItem('user'));
      if (user.quyen === 1)
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
