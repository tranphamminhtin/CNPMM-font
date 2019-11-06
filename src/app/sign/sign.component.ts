import { Component, OnInit } from '@angular/core';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  username = 'tin';
  password = 'tin';
  constructor() { }

  ngOnInit() {
  }

  signInSubmit(formSignIn) {
    if(formSignIn.valid && this.validSignIn(formSignIn)) {
      console.log(formSignIn.value);
    }
  }

  signUpSubmit(formSignUp) {
    if(formSignUp.valid && this.validSignUp(formSignUp)) {
      console.log(formSignUp.value);
    }
  }

  validSignIn(formSignIn) {
    return !formSignIn.value.username.includes(' ');
  }

  validSignUp(formSignUp) {
    if(formSignUp.value.username.includes(' ')) {
      return false;
    }
    if(formSignUp.value.password !== formSignUp.value.password2) {
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
