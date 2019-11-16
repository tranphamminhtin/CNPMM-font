import { Component, OnInit, OnDestroy } from '@angular/core';
import { FixEmployeeService } from "./fix-employee.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fix-employee',
  templateUrl: './fix-employee.component.html',
  styleUrls: ['./fix-employee.component.css'],
  providers: [FixEmployeeService]
})
export class FixEmployeeComponent implements OnInit, OnDestroy {

  employee = {
    id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
    email: 'tin@gmail.com', right: { id: '1', description: 'Nhóm sản phẩm' }
  };
  user = { id: '1', username: 'tintin', password: '123456' };
  arrRights = [
    { id: '1', description: 'Nhóm sản phẩm' },
    { id: '2', description: 'Nhóm đơn hàng' },
    { id: '3', description: 'Nhóm nhân viên' }
  ];
  subscriptions: Subscription[] = [];
  constructor(private service: FixEmployeeService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fixEmployeeSubmit(formFixEmployee) {
    if (formFixEmployee.valid) {
      console.log(formFixEmployee);
      const sub = this.service.fixhEmployee(formFixEmployee.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            alert('Lỗi rồi');
          }
        }, err => {
          console.log(err);
          alert('Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          alert('Sửa thành công');
        });
    }
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
