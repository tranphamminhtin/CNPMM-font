import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountEmployeeService } from './account-employee.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-employee',
  templateUrl: './account-employee.component.html',
  styleUrls: ['./account-employee.component.css'],
  providers: [AccountEmployeeService]
})
export class AccountEmployeeComponent implements OnInit, OnDestroy {

  // information = {
  //   id: '5dcbe09e14d7f3514cb9ddc2', username: 'tintin', name: 'tranphamminhtin', numberPhone: '1234567890',
  //   email: 'tin@gmail', right: { id: '5dca750ea5c6196650e854aa', description: 'Nhóm sản phẩm' }
  // };
  // information = {
  //   id: '', username: '', name: '', numberPhone: '',
  //   email: 'tin@', right: { id: '', description: '' }
  // };
  subscriptions: Subscription[] = [];
  constructor(private service: AccountEmployeeService, private toastr: ToastrService,
    private router: Router) { }

  username = '';
  information = {};
  ngOnInit() {
    this.username = JSON.parse(sessionStorage.getItem('user')).username;
    console.log(this.username);
    AppComponent.isAdmin = true;
    const sub = this.service.getEmployee(this.username)
      .subscribe(res => {
        console.log(res);
        if (res['success']) {
          // Object.assign(this.information, res['message']);
          this.information = res['message'];
          const s = this.service.getRight(this.information['rightId'])
            .subscribe(right => {
              if (!right['success']) {
                s.unsubscribe();
                console.log(right['message']);
                this.toastr.error('Lỗi lấy quyền của người dùng', 'Lỗi lấy quyền');
              } else {
                Object.assign(this.information, { right: right['message'] });
              }
            }, err => {
              console.log(err);
              sub.unsubscribe();
              this.toastr.error('', 'Lỗi rồi');
            });
        } else {
          console.log(res['message']);
          if (res['login']) {
            this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error('Lỗi lấy thông tin người dùng', 'Lỗi lấy người');
          }
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => {
        this.subscriptions.push(sub);
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  editInfoSubmit(formInfo) {
    if (formInfo.valid) {
      console.log(formInfo.value);
      const sub = this.service.editInfo(formInfo.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login']);
            } else
              this.toastr.error('Sửa thất bại', 'Lỗi sửa thông tin');
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Sửa thành công', 'Thành công');
        });
    }
  }

  changePasswordSubmit(formChangePassword: NgForm) {
    if (formChangePassword.valid && this.validChangePasswordForm(formChangePassword)) {
      console.log(formChangePassword.value);
      const sub = this.service.changePassword(formChangePassword.value, this.information['username'])
        .subscribe(res => {
          console.log(res);
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login']);
            } else
              this.toastr.error(res['message'], 'Lỗi rồi');
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Đổi mật khẩu thành công', 'Thành công');
          formChangePassword.reset();
        });
    }
  }

  validChangePasswordForm(formChangePassword) {
    return formChangePassword.value.password === formChangePassword.value.password2;
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
