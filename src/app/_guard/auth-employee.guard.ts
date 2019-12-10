import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeeGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      var user = JSON.parse(sessionStorage.getItem('user'));
      if (user.quyen === 0) {
        // return true;
        return new Promise((resolve) => {
          this.http.get('http://localhost:3000/user/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
          })
            .subscribe(res => {
              if (!res['success']) {
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
                this.router.navigate(['/login'], { queryParams: { return: state.url } });
                if (res['login'])
                  this.toastr.warning('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
                resolve(false);
              } else
                resolve(true);
            }, err => {
              sessionStorage.removeItem('user');
              sessionStorage.removeItem('token');
              this.router.navigate(['/login'], { queryParams: { return: state.url } });
              resolve(false);
            });
        });
      }
      else {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        this.router.navigate(['/login'], { queryParams: { return: state.url } });
        return false;
      }
    } else {
      this.router.navigate(['/login'], { queryParams: { return: state.url } });
      return false;
    }
  }

}
