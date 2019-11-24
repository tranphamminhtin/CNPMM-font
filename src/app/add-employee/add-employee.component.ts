import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddEmployeeService } from './add-employee.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private service: AddEmployeeService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    const sub = this.service.getListRight()
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.error('Lấy danh sách quyền thất bại', 'Lỗi rồi');
        } else {
          this.arrRights = res['message'];
          // console.log(res['message']);
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
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
            if (res['login']) {
              this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login']);
            } else
              this.toastr.error('Lỗi tạo người dùng', 'Lỗi');
            console.log(res['message']);
          }
          this.service.addEmployee(formAddEmployee.value)
            .subscribe(employee => {
              if (!employee['success']) {
                this.toastr.error('Lỗi tạo nhân viên', 'Lỗi');
                console.log(employee['message']);
                this.service.removeUser(formAddEmployee.value.username).subscribe();
                sub.unsubscribe();
              }
            }, err => {
              console.log(err);
              sub.unsubscribe();
              this.toastr.error('', 'Lỗi rồi');
            });
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Tạo thành công', 'Thành công');
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
