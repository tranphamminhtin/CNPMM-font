import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.html'
})
export class LoginAdminComponent implements OnDestroy {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  subscriptions: Subscription[] = [];

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
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Có lỗi');
        }, () => {
          this.subscriptions.push(sub);
          this.router.navigate(['/admin/home']);
        });
    }
  }

  validFormSignIn(formSignInAdmin) {
    return !formSignInAdmin.value.username.includes(' ');
  }
}
