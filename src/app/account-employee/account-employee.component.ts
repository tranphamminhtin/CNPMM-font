import { Component, OnInit } from '@angular/core';
import { AccountEmployeeService } from './account-employee.service';

@Component({
  selector: 'app-account-employee',
  templateUrl: './account-employee.component.html',
  styleUrls: ['./account-employee.component.css'],
  providers: [AccountEmployeeService]
})
export class AccountEmployeeComponent implements OnInit {

  information = {id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
                 email: 'tin@gmail.com', right: {id: '1', description: 'Nhóm sản phẩm'}};
  constructor(service: AccountEmployeeService) { }

  ngOnInit() {
  }

  editInfoSubmit(formInfo) {
    if(formInfo.valid) {
      console.log(formInfo.value);
    }
  }

  changePasswordSubmit(formChangePassword) {
    if(formChangePassword.valid && this.validChangePasswordForm(formChangePassword)) {
      console.log(formChangePassword.value);
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
