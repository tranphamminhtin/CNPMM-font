import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListEmployeeService } from "./list-employee.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  providers: [ListEmployeeService]
})
export class ListEmployeeComponent implements OnInit, OnDestroy {

  arrEmployees = [
    {
      id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
      email: 'tin@gmail.com', right: { id: '1', description: 'Nhóm sản phẩm' }
    },
    {
      id: '2', username: 'tungtung', name: 'Trần Minh Tùng', numberPhone: '1234567890',
      email: 'tung@gmail.com', right: { id: '1', description: 'Nhóm khách hàng' }
    },
    {
      id: '3', username: 'tintung', name: 'Tín Tùng', numberPhone: '1234567890',
      email: 'tintung@gmail.com', right: { id: '1', description: 'Admin' }
    }
  ];
  subscriptions: Subscription[] = [];
  constructor(private service: ListEmployeeService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addEmployee() {
    console.log('thêm');
  }

  editEmployee(id: string) {
    console.log('sửa ' + id);
  }

  removeEmployee(username: string) {
    const sub = this.service.delete(username)
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
        alert('Xóa thành công');
        // refresh lại
        // const index = this.arrEmployees.findIndex(e => e.id === id);
        // this.arrEmployees.splice(index, 1);
      });
  }
}
