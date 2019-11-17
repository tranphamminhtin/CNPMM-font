import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddEmployeeService } from './add-employee.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [AddEmployeeService]
})
export class AddEmployeeComponent implements OnInit, OnDestroy {

  arrRights = [
    { id: '1', description: 'Nhóm sản phẩm' },
    { id: '2', description: 'Nhóm đơn hàng' },
    { id: '3', description: 'Nhóm nhân viên' }
  ];
  subscriptions: Subscription[] = [];
  constructor(private service: AddEmployeeService, private router: Router) { }

  ngOnInit() {
    const sub = this.service.getListRight()
    .subscribe(res => {
      if(!res['success']){
        sub.unsubscribe();
        console.log(res['message']);
        alert('Lỗi rồi');
      } else {
        this.arrRights = res['message'];
        // console.log(res['message']);
      }
    }, err => {
      console.log(err);
      alert('Lỗi rồi');
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addEmployeeSubmit(formAddEmployee) {
    if (formAddEmployee.valid) {
      console.log(formAddEmployee.value);
      const sub = this.service.addUser(formAddEmployee.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            alert('Lỗi tạo người dùng');
            console.log(res['message']);
          }
          this.service.addEmployee(formAddEmployee.value)
            .subscribe(employee => {
              if (!employee['success']) {
                alert('Lỗi tạo nhân viên');
                console.log(employee['message']);
                this.service.removeUser(formAddEmployee.value.username);
                sub.unsubscribe();
              }
            }, err => {
              console.log(err);
              alert('Lỗi rồi');
            });
        }, err => {
          console.log(err);
          alert('Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          alert('Tạo thành công');
          this.router.navigate(['/admin/ql-nhan-vien']);
        });
    }
  }

  validAddEmployeeForm(formAddEmployee) {
    if (formAddEmployee.value.username.includes(' ')) {
      return false;
    }
    if (formAddEmployee.value.password !== formAddEmployee.value.password2) {
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
