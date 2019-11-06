import { Component } from '@angular/core';

@Component({
	selector: 'app-change-password',
	template: `
    <app-header></app-header>
    <div class="breadcrumb-area">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="breadcrumb-list">
						<h1>đổi mật khẩu</h1>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="login-area">
		<div class="container">
			<div class="rows">
				<div class="col-md-3 hidden-sm hidden-xs"></div>
				<div class="col-md-6 col-sm-12 col-xs-12">
					<div class="login-content">
						<div class="message-title">
							<h2>Đổi mật khẩu</h2>
							<p>Hãy điền mật khẩu mới của bạn</p>
						</div>
						<div class="rows">
							<form (ngSubmit)="changePasswordSubmit(formChangePassword);" #formChangePassword="ngForm"
								id="change-pass-form">
								<div class="form-group">
									<label>Mật khẩu cũ <span class="required">*</span></label> <input
										type="password" placeholder="Mật khẩu cũ" name="oldpassword" minlength="6"
										class="form-control" required ngModel/>
								</div>
								<div class="form-group">
									<label>Mật khẩu mới <span class="required">*</span></label> <input
										type="password" placeholder="Mật khẩu mới" name="password1"
										id="password1" class="form-control" required minlength="6" maxlength="45" ngModel/>
								</div>
								<div class="form-group">
									<label>Xác nhận lại mật khẩu <span class="required">*</span></label>
									<input type="password" placeholder="Xác nhận mật khẩu"
										name="password2" class="form-control" required ngModel/>
								</div>
								<input type="submit" value="Lưu thay đổi" class="login-sub">
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-3 hidden-sm hidden-xs"></div>
			</div>
		</div>
	</div>
    <app-footer></app-footer>
  `
})
export class ChangePasswordComponent {
	changePasswordSubmit(formChangePassword) {
		if (formChangePassword.valid && this.validFormChangePassword(formChangePassword)) {
			console.log(formChangePassword.value);
		}
	}

	validFormChangePassword(formChangePassword) {
		return formChangePassword.value.password1 === formChangePassword.value.password2;
	}
}
