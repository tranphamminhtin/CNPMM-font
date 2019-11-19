import { Component, OnInit, OnDestroy } from '@angular/core';
import { HistoryService } from "./history.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [HistoryService]
})
export class HistoryComponent implements OnInit, OnDestroy {

  arrOrders = [
    { id: '1', date: '02/11/2019', amount: 1, price: 3000, state: 'al' },
    { id: '2', date: '03/11/2019', amount: 1, price: 3000, state: 'as' },
    { id: '3', date: '04/11/2019', amount: 1, price: 3000, state: 'ad' },
    { id: '4', date: '05/11/2019', amount: 1, price: 3000, state: 'af' }
  ];
  subscriptions: Subscription[] = [];
  constructor(private service: HistoryService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  removeOrder(id: string) {
    if (confirm('Bạn thật sự muốn xóa???')) {
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
          // refresh lại
          // const index = this.arrOrders.findIndex(order => order.id === id);
          // this.arrOrders.splice(index, 1);
        });
    }
  }
}
