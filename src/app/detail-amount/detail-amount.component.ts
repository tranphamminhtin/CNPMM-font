import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailAmountService } from "./detail-amount.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-detail-amount',
  templateUrl: './detail-amount.component.html',
  styleUrls: ['./detail-amount.component.css'],
  providers: [DetailAmountService]
})
export class DetailAmountComponent implements OnInit, OnDestroy {

  // product = { id: '1', name: 'adidas1' };
  // arrAmounts = [
  //   { id: '1', size: 39, amount: 20 },
  //   { id: '2', size: 40, amount: 40 },
  //   { id: '3', size: 41, amount: 41 },
  //   { id: '4', size: 42, amount: 42 }
  // ];
  product = {};
  arrAmounts = [];
  subscriptions: Subscription[] = [];
  id = '';
  constructor(private service: DetailAmountService,
    private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
    const sub = this.service.getProduct(this.id)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          alert('Lỗi lấy sản phẩm');
          this.router.navigate(['/ql-san-pham']);
        } else {
          this.product = res['message'];
          this.refreshArrAmounts(sub);
        }
      }, err => {
        console.log(err);
        alert('Lỗi rồi')
      }, () => {
        this.subscriptions.push(sub);
      })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  refreshArrAmounts(sub) {
    this.service.getDetailProduct(this.id)
      .subscribe(detail => {
        if (!detail['success']) {
          console.log(detail['message']);
          alert('Lỗi lấy chi tiết');
          sub.unsubscribe();
        } else {
          this.arrAmounts = detail['message'];
        }
      }, err => {
        console.log(err);
        alert('Lỗi rồi');
      });
  }

  addAmount(id: string, formAdd: NgForm) {
    if (formAdd.value.size > 30 && formAdd.value.size < 100 && formAdd.value.amount > 0) {
      let a = { productId: id, size: formAdd.value.size, amount: formAdd.value.amount };
      const sub = this.service.add(a)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            alert('Lỗi rồi');
          } else {
            this.refreshArrAmounts(sub);
            formAdd.reset();
          }
        }, err => {
          console.log(err);
          alert('Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          alert('Thêm thành công');
          // let amout = { id: res['message'], size: size, amount: amount};
          //   this.arrAmounts.unshift(amout);
        });
    }
  }

  editAmount(id: string, amount: number) {
    // let a = { size: size, amount: amount };
    const sub = this.service.fix({ amount: amount }, id)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          alert('Lỗi rồi');
        } else {
          this.refreshArrAmounts(sub);
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

  removeAmount(id: string) {
    const sub = this.service.delete(id)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          alert('Lỗi rồi');
        } else {
          this.refreshArrAmounts(sub);
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
