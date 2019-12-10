import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListRightService } from "./list-right.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-right',
  templateUrl: './list-right.component.html',
  styleUrls: ['./list-right.component.css'],
  providers: [ListRightService]
})
export class ListRightComponent implements OnInit, OnDestroy {

  arrRights = [];
  subscriptions: Subscription[] = [];
  constructor(private service: ListRightService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('admin')) {
      this.router.navigate(['/admin/home']);
    } else
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
          if (res['login']) {
            this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login'], { queryParams: { return: '/admin/ql-quyen' } });
          } else
            this.toastr.warning('Lỗi lấy quyền');
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
          if (res['login']) {
            this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login'], { queryParams: { return: '/admin/ql-quyen' } });
          } else
            this.toastr.error('Xóa thất bại');
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => {
        this.subscriptions.push(sub);
        this.toastr.success('Xóa thành công', 'Thành công');
        this.getListRight();
      });
  }
}
