import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.html'
})
export class LoginAdminComponent implements OnDestroy, OnInit {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService,
    private route: ActivatedRoute) { }

  subscriptions: Subscription[] = [];
  return = '';

  ngOnInit() {
    AppComponent.isAdmin = false;
    sessionStorage.removeItem('token');
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/admin/home');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  signInAdmin(formSignInAdmin) {
    if (formSignInAdmin.valid && this.validFormSignIn(formSignInAdmin)) {
      console.log(formSignInAdmin.value);
      const url = 'http://localhost:3000/user/login/0';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = JSON.stringify(formSignInAdmin.value);
      const sub = this.http.post(url, body, { headers })
        .subscribe(res => {
          if (!res["success"]) {
            sub.unsubscribe();
            console.log(res['message']);
            this.toastr.warning("Tên đăng nhập hoặc mật khẩu sai", '!!!');
          } else {
            sessionStorage.setItem('user', JSON.stringify({ username: formSignInAdmin.value.username, quyen: 0 }));
            sessionStorage.setItem('token', res['token']);
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Có lỗi');
        }, () => {
          this.subscriptions.push(sub);
          this.router.navigate([this.return]);
        });
    }
  }

  validFormSignIn(formSignInAdmin) {
    return !formSignInAdmin.value.username.includes(' ');
  }
}
