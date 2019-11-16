import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountEmployeeService } from './account-employee.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-employee',
  templateUrl: './account-employee.component.html',
  styleUrls: ['./account-employee.component.css'],
  providers: [AccountEmployeeService]
})
export class AccountEmployeeComponent implements OnInit, OnDestroy {

  information = {
    id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
    email: 'tin@gmail.com', right: { id: '1', description: 'Nhóm sản phẩm' }
  };
  subscriptions: Subscription[] = [];
  constructor(private service: AccountEmployeeService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  username = '';

  editInfoSubmit(formInfo) {
    if (formInfo.valid) {
      console.log(formInfo.value);
      this.subscriptions.push(this.service.editInfo(formInfo.value)
        .subscribe(res => {
          if (!res['success']) {
            console.log(res['message']);
            alert('Lỗi rồi! Sửa thất bại');
          }
        }, err => {
          console.log(err);
          alert('Lỗi rồi');
        }, () => alert('Sửa thành công')));
    }
  }

  changePasswordSubmit(formChangePassword: NgForm) {
    if (formChangePassword.valid && this.validChangePasswordForm(formChangePassword)) {
      console.log(formChangePassword.value);
      this.subscriptions.push(this.service.changePassword(formChangePassword.value, this.username)
        .subscribe(res => {
          if (!res['success']) {
            console.log(res['message']);
            alert('Lỗi rồi! Đổi mật khẩu thất bại');
          }
        }, err => {
          console.log(err);
          alert('Lỗi rồi');
        }, () => {
          alert('Đổi mật khẩu thành công');
          formChangePassword.reset();
        }));
    }
  }

  validChangePasswordForm(formChangePassword) {
    return formChangePassword.value.password1 === formChangePassword.value.password2;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
