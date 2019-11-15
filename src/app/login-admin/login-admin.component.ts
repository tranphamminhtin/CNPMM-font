import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.html'
})
export class LoginAdminComponent {
  constructor(private http: HttpClient, private router: Router) { }

  signInAdmin(formSignInAdmin) {
    if(formSignInAdmin.valid && this.validFormSignIn(formSignInAdmin)){
      const url = 'http://localhost:3000/user/login/0';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = JSON.stringify(formSignInAdmin.value);
      this.http.post(url, body, { headers })
        .toPromise()
        .then(result => {
          if (!result["success"])
            alert("Tên đăng nhập hoặc mật khẩu sai");
          else {
            this.router.navigate(['/admin/home']);
          }
        });
    }
  }

  validFormSignIn(formSignInAdmin) {
    return !formSignInAdmin.value.username.includes(' ');
  }
}
