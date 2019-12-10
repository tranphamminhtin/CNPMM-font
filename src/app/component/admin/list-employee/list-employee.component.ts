import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListEmployeeService } from "./list-employee.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  providers: [ListEmployeeService]
})
export class ListEmployeeComponent implements OnInit, OnDestroy {

  arrEmployees = [];
  subscriptions: Subscription[] = [];
  constructor(private service: ListEmployeeService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('admin')) {
      this.router.navigate(['/admin/home']);
    } else
      this.getListEmployee();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getListEmployee() {
    const sub = this.service.getList()
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          if (res['login']) {
            this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login'], { queryParams: { return: '/admin/ql-nhan-vien' } });
          } else
            this.toastr.warning('Không lấy được danh sách', '!!!');
        } else {
          this.arrEmployees = res['message'];
          this.arrEmployees.forEach(employee => {
            this.service.getRight(employee.rightId)
              .subscribe(right => {
                if (!right['success']) {
                  sub.unsubscribe();
                  console.log(right['message']);
                  this.toastr.error('Lỗi lấy quyền', 'Lỗi rồi');
                } else {
                  Object.assign(employee, { right: right['message'] });
                }
              }, err => {
                sub.unsubscribe();
                console.log(err);
                this.toastr.error('', 'Lỗi rồi');
              });
          });
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => this.subscriptions.push(sub));
  }

  removeEmployee(username: string) {
    const sub = this.service.delete(username)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          if (res['login']) {
            this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login'], { queryParams: { return: '/admin/ql-nhan-vien' } });
          } else
            this.toastr.error('Xóa thất bại');
        }
      }, err => {
        console.log(err);
        this.toastr.error('Lỗi rồi');
      }, () => {
        this.subscriptions.push(sub);
        this.toastr.success('Xóa thành công', 'Thành công');
        this.getListEmployee();
        // refresh lại
        // const index = this.arrEmployees.findIndex(e => e.id === id);
        // this.arrEmployees.splice(index, 1);
      });
  }
}
