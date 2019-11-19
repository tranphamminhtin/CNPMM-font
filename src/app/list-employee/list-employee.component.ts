import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListEmployeeService } from "./list-employee.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  providers: [ListEmployeeService]
})
export class ListEmployeeComponent implements OnInit, OnDestroy {

  // arrEmployees = [
  //   {
  //     id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
  //     email: 'tin@gmail.com', right: { id: '1', description: 'Nhóm sản phẩm' }
  //   },
  //   {
  //     id: '2', username: 'tungtung', name: 'Trần Minh Tùng', numberPhone: '1234567890',
  //     email: 'tung@gmail.com', right: { id: '1', description: 'Nhóm khách hàng' }
  //   },
  //   {
  //     id: '3', username: 'tintung', name: 'Tín Tùng', numberPhone: '1234567890',
  //     email: 'tintung@gmail.com', right: { id: '1', description: 'Admin' }
  //   }
  // ];
  arrEmployees = [];
  subscriptions: Subscription[] = [];
  constructor(private service: ListEmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
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
          this.toastr.warning('Không lấy được danh sách', '!!!');
        } else {
          // console.log(res['message']);
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
          this.toastr.error('Xóa thất bại', 'Lỗi rồi');
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
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
