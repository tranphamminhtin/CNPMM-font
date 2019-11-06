import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  arrRights = [
    {id: '1', description: 'Nhóm sản phẩm'},
    {id: '2', description: 'Nhóm đơn hàng'},
    {id: '3', description: 'Nhóm nhân viên'}
  ];
  constructor() { }

  ngOnInit() {
  }

  addEmployeeSubmit(formAddEmployee) {
    if(formAddEmployee.valid) {
      console.log(formAddEmployee.value); 
    }
  }

  validAddEmployeeForm(formAddEmployee) {
    if(formAddEmployee.value.username.includes(' ')) {
      return false;
    }
    if(formAddEmployee.value.password1 !== formAddEmployee.value.password2) {
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
