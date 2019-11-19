import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListRightService } from "./list-right.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-right',
  templateUrl: './list-right.component.html',
  styleUrls: ['./list-right.component.css'],
  providers: [ListRightService]
})
export class ListRightComponent implements OnInit, OnDestroy {

  // arrRights = [
  //   { id: '1', description: 'Nhóm sản phẩm' },
  //   { id: '2', description: 'Nhóm đơn hàng' },
  //   { id: '3', description: 'Nhóm nhân viên' }
  // ];
  arrRights = [];
  subscriptions: Subscription[] = [];
  constructor(private service: ListRightService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getListRight();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getListRight() {
    const sub = this.service.getList()
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.warning('Lỗi lấy quyền', '!!!');
        } else {
          this.arrRights = res['message'];
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi')
      }, () => this.subscriptions.push(sub));
  }

  removeRight(id: string) {
    const sub = this.service.delete(id)
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
        this.getListRight();
        // refresh lại
        // const index = this.arrRights.findIndex(e => e.id === id);
        // this.arrRights.splice(index, 1);
      });
  }
}
