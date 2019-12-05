import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service'
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartSessionService } from '../../../_service/cart-session.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit, OnDestroy {

  // arrCarts = [
  //   { id: '1', product: { id: '1', name: 'adidas', image: 'assets/img/product/giay1.jpg' }, amount: 1, price: 3000, size: 30 },
  //   { id: '2', product: { id: '2', name: 'nike', image: 'assets/img/product/giay1.jpg' }, amount: 2, price: 3000, size: 31 },
  //   { id: '3', product: { id: '3', name: 'hunter', image: 'assets/img/product/giay1.jpg' }, amount: 3, price: 3000, size: 32 },
  // ];
  arrCarts = [];
  subscriptions: Subscription[] = [];
  constructor(private service: CartService, private toastr: ToastrService,
    private cartSessionService: CartSessionService) { }

  ngOnInit() {
    this.arrCarts = this.cartSessionService.getCart();
    if (this.arrCarts !== null) {
      this.arrCarts.forEach(e => {
        const sub = this.service.getProduct(e.productId)
          .subscribe(res => {
            if (!res['success']) {
              sub.unsubscribe();
              this.toastr.error('Lỗi lấy sản phẩm');
              console.log(res['message']);
            } else {
              Object.assign(e, { product: res['message'] });
            }
          }, err => {
            this.toastr.error('Lỗi rồi');
            console.log(err);
          }, () => this.subscriptions.push(sub));
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTotalPrice(): number {
    let total = 0;
    try {
      this.arrCarts.forEach(cart => {
        total += parseFloat(((cart.product.price - cart.product.price * cart.product.promotion / 100)
          * cart.amount).toString());
      });
    } catch (e) { }
    return total;
  }

  updateCart(productId: string, size, amount: number) {
    const index = this.arrCarts.findIndex(cart => (cart.productId == productId && cart.size == size));
    this.arrCarts[index].amount = amount;
    this.cartSessionService.setCart(this.arrCarts);
    this.toastr.success('Sửa thành công');
  }

  removeCart(productId: string, size) {
    if (confirm('Bạn thật sự muốn xóa???')) {
      const index = this.arrCarts.findIndex(cart => (cart.productId == productId && cart.size == size));
      this.arrCarts.splice(index, 1);
      this.cartSessionService.setCart(this.arrCarts);
      this.toastr.success('Xóa thành công');
    }
  }
}
