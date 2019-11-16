import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignService } from "./sign.service";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  constructor(private service: SignService, private router: Router) { }

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
            alert("Tên đăng nhập hoặc mật khẩu sai");
          }
        }, err => {
          alert('Lỗi rồi');
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
                alert('Lỗi tạo khách hàng');
                this.service.removeUser(formSignUp.value['username']);
              }
            }, err => {
              alert('Lỗi rồi');
              console.log(err);
            });
        } else {
          alert(user['message']);
          sub.unsubscribe();
        }
      }, err => {
        alert('Lỗi rồi');
        console.log(err);
      }, () => {
        alert("Đăng ký thành công");
        this.username = formSignUp.value["username"];
        this.password = formSignUp.value["password"];
        formSignUp.reset();
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
