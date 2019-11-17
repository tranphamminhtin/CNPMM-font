import { Component, OnInit, OnDestroy } from '@angular/core';
import { FixEmployeeService } from "./fix-employee.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fix-employee',
  templateUrl: './fix-employee.component.html',
  styleUrls: ['./fix-employee.component.css'],
  providers: [FixEmployeeService]
})
export class FixEmployeeComponent implements OnInit, OnDestroy {

  // employee = {
  //   id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
  //   email: 'tin@gmail.com', right: { id: '1', description: 'Nhóm sản phẩm' }
  // };
  // user = { id: '1', username: 'tintin', password: '123456' };
  // arrRights = [
  //   { id: '1', description: 'Nhóm sản phẩm' },
  //   { id: '2', description: 'Nhóm đơn hàng' },
  //   { id: '3', description: 'Nhóm nhân viên' }
  // ];

  employee = {};
  arrRights = [];
  subscriptions: Subscription[] = [];
  id = '';
  constructor(private service: FixEmployeeService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
    const sub = this.service.searchEmployee(this.id)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.router.navigate(['/admin/ql-nhan-vien']);
          alert('Nhân viên không tồn tại');
        } else {
          this.employee = res['message'];
          console.log(res['message']);
        }
      }, err => {
        console.log(err);
        alert('Lỗi rồi');
      }, () => {
        this.subscriptions.push(sub);
      });
    const s = this.service.getListRight()
      .subscribe(res => {
        if (!res['success']) {
          s.unsubscribe();
          console.log(res['message']);
          alert('Lỗi lấy quyền');
        } else {
          this.arrRights = res['message'];
        }
      }, err => {
        console.log(err);
        alert('Lỗi rồi');
      }, () => this.subscriptions.push(s));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fixEmployeeSubmit(formFixEmployee) {
    if (formFixEmployee.valid && this.validPassword(formFixEmployee.value.password)) {
      console.log(formFixEmployee.value);
      const sub = this.service.fixhEmployee(formFixEmployee.value, this.id)
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
          this.router.navigate(['/admin/ql-nhan-vien']);
        });
    }
  }

  validPassword(password: string) {
    return password === '' || password.length > 5;
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
