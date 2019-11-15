import { Component, OnInit } from '@angular/core';
import { SignService } from "./sign.service";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  providers: [SignService]
})
export class SignComponent implements OnInit {

  username = 'tin';
  password = '123456';
  constructor(private service: SignService, private router: Router) { }

  ngOnInit() {
  }

  signInSubmit(formSignIn) {
    if (formSignIn.valid && this.validSignIn(formSignIn)) {
      this.service.signInPost(formSignIn.value)
        .then(result => {
          console.log(result);
          if (!result["success"])
            alert("Tên đăng nhập hoặc mật khẩu sai");
          else {
            this.router.navigate(['/account']);
          }
        })
        .catch(err => console.log(err));
    }
  }

  signUpSubmit(formSignUp: NgForm) {
    if (formSignUp.valid && this.validSignUp(formSignUp)) {
      this.service.signUpPost(formSignUp.value)
        .then(user => {
          if (user["success"]) {
            this.service.createClient(formSignUp.value)
              .then(result => {
                if (result["success"]) {
                  alert("Đăng ký thành công");
                  this.username = formSignUp.value["username"];
                  this.password = formSignUp.value["password"];
                } else {
                  this.service.removeUser(formSignUp.value["username"])
                    .catch(err => console.log(err));
                }
              }).catch(err => console.log(err));
          } else {
            alert(user["message"]);
          }
        }).catch(err => console.log(err));
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
