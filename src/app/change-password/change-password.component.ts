import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.html',

})
export class ChangePasswordComponent implements OnDestroy {

	username = 'tin';
	subscriptions: Subscription[] = [];
	constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	changePasswordSubmit(formChangePassword) {
		if (formChangePassword.valid && this.validFormChangePassword(formChangePassword)) {
			console.log(formChangePassword.value);
			const url = 'http://localhost:3000/user/users/' + this.username;
			const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
			const body = JSON.stringify(formChangePassword.value);
			const sub = this.http.put(url, body, { headers: headers })
				.subscribe(res => {
					console.log(res);
					if (!res['success']) {
						sub.unsubscribe();
						console.log(res['message']);
						if (res['login']) {
							this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
							this.router.navigate(['/dang-nhap']);
						} else
							this.toastr.error(res['message']);
					}
				}, err => {
					console.log(err);
					this.toastr.error('Lỗi rồi');
				}, () => {
					this.subscriptions.push(sub);
					this.toastr.success('Đổi mật khẩu thành công');
					formChangePassword.reset();
				});
		}
	}

	validFormChangePassword(formChangePassword) {
		return formChangePassword.value.password === formChangePassword.value.password2;
	}
}
