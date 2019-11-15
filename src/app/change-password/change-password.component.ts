import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.html',

})
export class ChangePasswordComponent {

	username = '';
	constructor(private http: HttpClient, private router: Router) { }

	changePasswordSubmit(formChangePassword) {
		if (formChangePassword.valid && this.validFormChangePassword(formChangePassword)) {
			console.log(formChangePassword.value);
			const url = 'http://localhost:3000/user/users/' + this.username;
			const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
			const body = JSON.stringify(formChangePassword.value);
			this.http.put(url, body, { headers: headers })
				.toPromise().then(result => {
					if (!result['success']) {
						console.log(result['message']);
						alert('Lỗi rồi! Đổi mật khẩu thất bại');
					}
					else{
						alert('Đổi mật khẩu thành công');
						this.router.navigate(['/account']);
					}
				})
				.catch(err => console.log(err));
		}
	}

	validFormChangePassword(formChangePassword) {
		return formChangePassword.value.password1 === formChangePassword.value.password2;
	}
}
