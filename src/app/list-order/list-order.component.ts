import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListOrderService } from "./list-order.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
  providers: [ListOrderService]
})
export class ListOrderComponent implements OnInit, OnDestroy {

  arrOrder = [
    { id: '1', date: '02/11/2019', amount: 1, price: 3000, state: 'aa', username: 'tintin' },
    { id: '2', date: '03/11/2019', amount: 1, price: 3000, state: 'as', username: 'tintin' },
    { id: '3', date: '04/11/2019', amount: 1, price: 3000, state: 'ad', username: 'tintin' },
    { id: '4', date: '05/11/2019', amount: 1, price: 3000, state: 'ad', username: 'tintin' }
  ];
  arrFiltered = [];
  isDone = false;
  stateShow = 'aa';
  subscriptions: Subscription[] = [];
  constructor(private service: ListOrderService) { }

  ngOnInit() {
    this.arrFiltered = this.arrOrder.filter(e => e.state === this.stateShow);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getAmount(orderId) {
    // this.service.getTotal(orderId).then(result => {
    //   if(!result["success"]) {
    //     console.log(result['message']);
    //   } else {
    //     try {
    //       return parseInt(result['message']);
    //     } catch(err) {
    //       console.log(err);
    //       return 0;
    //     }
    //   }
    // }).catch(err => console.log(err));
    return 0;
  }

  show(state: string) {
    this.stateShow = state;
    this.arrFiltered = this.arrOrder.filter(e => e.state === this.stateShow);
    if (state === 'ad') {
      this.isDone = true;
    }
  }

  removeOrder(id: string) {
    const sub = this.service.delete(id)
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
        // const index = this.arrFiltered.findIndex(e => e.id === id);
        // this.arrFiltered.splice(index, 1);
      });
  }

  next(id: string) {
    console.log(id);
  }
}
