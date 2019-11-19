import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service'
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit, OnDestroy {

  arrCarts = [
    { id: '1', product: { id: '1', name: 'adidas', image: 'assets/img/product/giay1.jpg' }, amount: 1, price: 3000, size: 30 },
    { id: '2', product: { id: '2', name: 'nike', image: 'assets/img/product/giay1.jpg' }, amount: 2, price: 3000, size: 31 },
    { id: '3', product: { id: '3', name: 'hunter', image: 'assets/img/product/giay1.jpg' }, amount: 3, price: 3000, size: 32 },
  ];
  subscriptions: Subscription[] = [];
  constructor(private service: CartService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTotalPrice(): number {
    let total = 0;
    this.arrCarts.forEach(cart => { total += cart.price * cart.amount; })
    return total;
  }

  updateCart(id: string, amount: number) {
    console.log('update id: ' + id + " amount: " + amount);
    const sub = this.service.editDetailCart(id, amount)
      .subscribe(res => {
        if (!res['success']) {
          this.toastr.error('Sửa thấy bại', 'Lỗi rồi');
          console.log(res['message']);
          sub.unsubscribe();
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => {
        this.subscriptions.push(sub);
        // gọi hàm refresh
      });
  }

  removeCart(id: string) {
    if (confirm('Bạn thật sự muốn xóa???')) {
      const sub = this.service.deleteDetail(id)
        .subscribe(res => {
          if (!res['success']) {
            this.toastr.error('Xóa thất bại', 'Lỗi rồi');
            console.log(res['message']);
            sub.unsubscribe();
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Xóa thành công', 'Thành công');
          // refresh giỏ hàng
          // const index = this.arrCarts.findIndex(cart => cart.id === id);
          //   this.arrCarts.splice(index, 1);
          //   if(this.arrCarts.length === 0) {
          //     this.toastr('Giỏ hàng trống');
          // xóa luôn giỏ hàng
        });
    }
  }
}
