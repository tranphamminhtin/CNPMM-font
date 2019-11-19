import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignService } from "./sign.service";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  providers: [SignService]
})
export class SignComponent implements OnInit, OnDestroy {

  username = 'tin';
  password = '123456';
  subscriptions: Subscription[] = [];
  constructor(private service: SignService, private router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  signInSubmit(formSignIn) {
    if (formSignIn.valid && this.validSignIn(formSignIn)) {
      const sub = this.service.signInPost(formSignIn.value)
        .subscribe(res => {
          console.log(res);
          if (!res["success"]) {
            sub.unsubscribe();
            console.log(res['message']);
            this.toastr.warning("Tên đăng nhập hoặc mật khẩu sai", '!!!');
          }
        }, err => {
          this.toastr.error('', 'Lỗi rồi');
          console.log(err);
        }, () => {
          this.subscriptions.push(sub);
          this.router.navigate(['/account']);
        });
    }
  }

  signUpSubmit(formSignUp: NgForm) {
    if (formSignUp.valid && this.validSignUp(formSignUp)) {
      const sub = this.service.signUpPost(formSignUp.value).subscribe(user => {
        if (user["success"]) {
          this.service.createClient(formSignUp.value)
            .subscribe(res => {
              if (!res["success"]) {
                sub.unsubscribe();
                console.log(res['message']);
                this.toastr.error('Lỗi tạo khách hàng', 'Tạo tài khoản thất bại');
                this.service.removeUser(formSignUp.value['username']);
              }
            }, err => {
              this.toastr.error('', 'Lỗi rồi');
              console.log(err);
            });
        } else {
          this.toastr.warning(user['message'], '!!!');
          sub.unsubscribe();
        }
      }, err => {
        this.toastr.error('', 'Lỗi rồi');
        console.log(err);
      }, () => {
        this.toastr.success("Đăng ký thành công", 'Thành công');
        this.username = formSignUp.value["username"];
        this.password = formSignUp.value["password"];
        formSignUp.reset();
        formSignUp.value.right = 1;
        // cuốn trang lên đầu
        let scrollToTop = window.setInterval(() => {
          let pos = window.pageYOffset;
          if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
          } else {
            window.clearInterval(scrollToTop);
          }
        }, 16);
        this.subscriptions.push(sub);
      });
    }
  }

  validSignIn(formSignIn) {
    return !formSignIn.value.username.includes(' ');
  }

  validSignUp(formSignUp) {
    if (formSignUp.value.username.includes(' ')) {
      return false;
    }
    if (formSignUp.value.password !== formSignUp.value.password2) {
      return false;
    }
    return true;
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
