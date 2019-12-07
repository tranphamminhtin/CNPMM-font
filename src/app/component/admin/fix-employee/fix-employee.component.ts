import { Component, OnInit, OnDestroy } from '@angular/core';
import { FixEmployeeService } from "./fix-employee.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (!sessionStorage.getItem('admin')) {
      this.router.navigate(['/admin/home']);
    } else {
      this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
      const sub = this.service.searchEmployee(this.id)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login'], { queryParams: { return: '/admin/sua-nhan-vien/' + this.id } });
            } else {
              this.router.navigate(['/admin/ql-nhan-vien']);
              this.toastr.warning('Nhân viên không tồn tại', 'Sai mã nhân viên');
            }
          } else {
            this.employee = res['message'];
            console.log(res['message']);
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
        });
      const s = this.service.getListRight()
        .subscribe(res => {
          if (!res['success']) {
            s.unsubscribe();
            console.log(res['message']);
            this.toastr.error('Lỗi lấy quyền', 'Lỗi rồi');
          } else {
            this.arrRights = res['message'];
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => this.subscriptions.push(s));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fixEmployeeSubmit(formFixEmployee) {
    if (formFixEmployee.valid && this.validPassword(formFixEmployee.value.password)) {
      console.log(formFixEmployee.value);
      const sub = this.service.fixhEmployee(formFixEmployee.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login'], { queryParams: { return: '/admin/sua-nhan-vien/' + this.id } });
            } else
              this.toastr.error('Sửa thất bại', 'Lỗi rồi');
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Sửa thành công', 'Thành công');
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
