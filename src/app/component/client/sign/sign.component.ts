import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignService } from "./sign.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

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
    , private toastr: ToastrService, private authService: AuthService, private route: ActivatedRoute) { }
  return = '';
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/home');
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  signInSubmit(formSignIn) {
    if (formSignIn.valid && this.validSignIn(formSignIn)) {
      const sub = this.service.signInPost(formSignIn.value)
        .subscribe(res => {
          if (!res["success"]) {
            sub.unsubscribe();
            console.log(res['message']);
            this.toastr.warning("Tên đăng nhập hoặc mật khẩu sai", '!!!');
          } else {
            sessionStorage.setItem('user', JSON.stringify({ username: formSignIn.value.username, quyen: 1 }));
            sessionStorage.setItem('token', res['token']);
            sessionStorage.setItem('isLogin', JSON.stringify(true));
          }
        }, err => {
          this.toastr.error('', 'Lỗi rồi');
          console.log(err);
        }, () => {
          this.subscriptions.push(sub);
          this.route.queryParams
            .subscribe(params => this.return = params['return'] || '/account');
          this.router.navigate([this.return]);
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
                this.service.removeUser(formSignUp.value['username']).subscribe();
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

  socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.authService.signOut();
    this.authService.signIn(socialPlatformProvider).then(socialusers => {
      const sub = this.service.socialSignIn(socialProvider, socialusers)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            this.toastr.error('Lỗi rồi, đăng nhập thất bại');
          } else {
            sessionStorage.setItem('user', JSON.stringify({ username: res['username'], quyen: 1 }));
            sessionStorage.setItem('token', res['token']);
            sessionStorage.setItem('isLogin', JSON.stringify(true));
          }
        }, err => {
          console.log(err);
          this.toastr.error('Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.route.queryParams
            .subscribe(params => this.return = params['return'] || '/thong-tin');
          this.router.navigate([this.return]);
        });
    });
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
