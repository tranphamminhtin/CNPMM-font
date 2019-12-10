import { Component, OnInit, OnDestroy } from '@angular/core';
import { HistoryService } from "./history.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [HistoryService]
})
export class HistoryComponent implements OnInit, OnDestroy {

  arrOrders = [];
  subscriptions: Subscription[] = [];
  username = '';
  constructor(private service: HistoryService, private toastr: ToastrService
    , private router: Router) { }

  ngOnInit() {
    this.username = JSON.parse(sessionStorage.getItem('user')).username;
    const sub = this.service.getList(this.username)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          if (res['login']) {
            this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/dang-nhap'], { queryParams: { return: '/lich-su' } });
          } else
            this.toastr.error('Lỗi lấy lịch sử');
        } else {
          this.arrOrders = res['message'];
          this.arrOrders.forEach(e => {
            this.service.getDetail(e._id)
              .subscribe(r => {
                if (!r['success']) {
                  sub.unsubscribe();
                  console.log(r['message']);
                  this.toastr.error('Lỗi lấy tổng sp');
                } else {
                  var detail = [];
                  var amount = 0;
                  detail = r['message'];
                  detail.forEach(d => amount += parseInt(d.amount));
                  Object.assign(e, { amount: amount });
                }
              }, err => {
                sub.unsubscribe();
                console.log(err);
                this.toastr.error('Lỗi rồi');
              });
          });
        }
      }, err => {
        console.log(err);
        this.toastr.error('Lỗi rồi');
      }, () => {
        this.subscriptions.push(sub);
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  removeOrder(id: string) {
    if (confirm('Bạn thật sự muốn xóa???')) {
      const sub = this.service.deleteDetail(id)
        .subscribe(detail => {
          if (!detail['success']) {
            sub.unsubscribe();
            console.log(detail['message']);
            if (detail['login']) {
              this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/dang-nhap'], { queryParams: { return: '/lich-su' } });
            } else
              this.toastr.error('Xóa thất bại');
          } else {
            this.service.delete(id)
              .subscribe(res => {
                if (!res['success']) {
                  sub.unsubscribe();
                  console.log(res['message']);
                  this.toastr.error('Xóa thất bại');
                }
              }, err => {
                sub.unsubscribe();
                console.log(err);
                this.toastr.error('Lỗi rồi');
              });
          }
        }, err => {
          console.log(err);
          this.toastr.error('Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Xóa thành công');
          const index = this.arrOrders.findIndex(order => order.id === id);
          this.arrOrders.splice(index, 1);
        });
    }
  }

  showState(state: String) {
    switch (state) {
      case 'dat': return 'Đã đặt';
      case 'duyet': return 'Đang giao';
      case 'giao': return 'Hoàn tất';
      default: return null;
    }
    return null;
  }
}
