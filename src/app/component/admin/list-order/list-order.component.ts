import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListOrderService } from "./list-order.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
  providers: [ListOrderService]
})
export class ListOrderComponent implements OnInit, OnDestroy {

  // arrOrder = [
  //   { id: '1', date: '02/11/2019', amount: 1, price: 3000, state: 'aa', username: 'tintin' },
  //   { id: '2', date: '03/11/2019', amount: 1, price: 3000, state: 'as', username: 'tintin' },
  //   { id: '3', date: '04/11/2019', amount: 1, price: 3000, state: 'ad', username: 'tintin' },
  //   { id: '4', date: '05/11/2019', amount: 1, price: 3000, state: 'ad', username: 'tintin' }
  // ];
  arrOrder = [];
  arrFiltered = [];
  isDone = false;
  stateShow = 'dat';
  subscriptions: Subscription[] = [];
  constructor(private service: ListOrderService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('admin') && !sessionStorage.getItem('order')) {
      this.router.navigate(['/admin/home']);
    } else {
      const sub = this.service.getList()
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login']);
            } else
              this.toastr.error('Lỗi lấy danh sách');
          } else {
            this.arrOrder = res['message'];
            this.arrOrder.forEach(e => {
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
          this.arrFiltered = this.arrOrder.filter(e => e.state === this.stateShow);
        });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  show(state: string) {
    this.stateShow = state;
    this.arrFiltered = this.arrOrder.filter(e => e.state === this.stateShow);
    if (state === 'giao') {
      this.isDone = true;
    }
  }

  removeOrder(id: string) {
    const sub = this.service.deleteDetail(id)
      .subscribe(detail => {
        if (!detail['success']) {
          sub.unsubscribe();
          console.log(detail['message']);
          if (detail['login']) {
            this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login']);
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
        const index = this.arrOrder.findIndex(e => e.id === id);
        this.arrOrder.splice(index, 1);
        this.arrFiltered = this.arrOrder.filter(e => e.state === this.stateShow);
      });
  }

  next(id: string) {
    const index = this.arrOrder.findIndex(e => e._id === id);
    const state = this.arrOrder[index].state;
    switch (state) {
      case 'dat': {
        this.arrOrder[index].state = 'duyet';
        break;
      }
      case 'duyet': {
        this.arrOrder[index].state = 'giao';
        break;
      }
      default: break;
    }
    let flag = true;
    const sub = this.service.updateOrder(this.arrOrder[index])
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          if (res['login']) {
            this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login']);
          } else
            this.toastr.error('Duyệt thất bại');
          this.arrOrder[index].state = state;
          flag = false;
        } else {
          if (state === 'dat') {
            this.service.sendMail(this.arrOrder[index])
              .subscribe(r => {
                if (!r['success']) {
                  sub.unsubscribe();
                  console.log(r['message']);
                  this.toastr.error('Gửi mail thất bại');
                  this.arrOrder[index].state = state;
                  this.service.updateOrder(this.arrOrder[index])
                    .subscribe();
                  flag = false;
                }
              }, err => {
                this.arrOrder[index].state = state;
                this.service.updateOrder(this.arrOrder[index])
                  .subscribe();
                flag = false;
                sub.unsubscribe();
                console.log(err);
                this.toastr.error('Lỗi rồi');
              });
          }
        }
      }, err => {
        this.arrOrder[index].state = state;
        console.log(err);
        this.toastr.error('Lỗi rồi');
        flag = false;
      }, () => {
        this.subscriptions.push(sub);
        if (flag) {
          this.toastr.success('Duyệt thành công');
          this.arrFiltered = this.arrOrder.filter(e => e.state === this.stateShow);
        }
      });
  }
}
