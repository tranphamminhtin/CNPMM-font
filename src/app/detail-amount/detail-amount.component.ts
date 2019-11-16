import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailAmountService } from "./detail-amount.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-amount',
  templateUrl: './detail-amount.component.html',
  styleUrls: ['./detail-amount.component.css'],
  providers: [DetailAmountService]
})
export class DetailAmountComponent implements OnInit, OnDestroy {

  product = { id: '1', name: 'adidas1' };
  arrAmounts = [
    { id: '1', size: 39, amount: 20 },
    { id: '2', size: 40, amount: 40 },
    { id: '3', size: 41, amount: 41 },
    { id: '4', size: 42, amount: 42 }
  ];
  subscriptions: Subscription[] = [];
  constructor(private service: DetailAmountService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addAmount(id: string, size: number, amount: number) {
    if (size > 30 && size < 100 && amount > 0) {
      console.log('thêm ' + id + 'size: ' + size + 'số lượng: ' + amount);
      let a = { productId: id, size: size, amount: amount };
      const sub = this.service.add(a)
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
          alert('Thêm thành công');
          //refresh lại
          // let amout = { id: res['message'], size: size, amount: amount};
          //   this.arrAmounts.unshift(amout);
        });
    }
  }

  editAmount(id: string, size: number, amount: number) {
    let a = { size: size, amount: amount };
    const sub = this.service.fix(a, id)
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
        alert('Sửa thành công');
        // refresh lại
        // const index = this.arrAmounts.findIndex(e => e.size === size);
        // this.arrAmounts[index].amount = amount;
      });
  }

  removeAmount(id: string, size: number) {
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
        // const index = this.arrAmounts.findIndex(e => e.size === size);
        // this.arrAmounts.splice(index, 1);
      });

  }

}
