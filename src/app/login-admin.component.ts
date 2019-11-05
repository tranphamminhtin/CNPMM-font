import { Component } from '@angular/core';

@Component({
  selector: 'app-login-admin',
  template: `
  <div class="login-header">
		<h1>Quản lý GIAYNE</h1>
		<br /> <br />
	</div>
	<div class="col-md-4"></div>
	<form action="DangNhapAdminController" method="post" id="login-admin"
		class="col-md-4">
		<div class="login">
			<div class="login-form">
				<div class="form-group">
					<label>Tên đăng nhập</label> <input type="text" name="username"
						class="form-control" />
				</div>
				<div class="form-group">
					<label>Mật khẩu</label> <input type="password" name="pass"
						class="form-control" />
				</div>
				<input type="submit" class="btn btn-success" id="submit-button"
					value="Đăng nhập">
			</div>
		</div>
	</form>
	<div class="col-md-4"></div>
  `
})
export class LoginAdminComponent {}
