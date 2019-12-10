import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from "./order.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartSessionService } from '../../../_service/cart-session.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit, OnDestroy {

  arrCarts = [];
  username = '';
  client = {};
  subscriptions: Subscription[] = [];

  constructor(private service: OrderService, private toastr: ToastrService,
    private cartSessionService: CartSessionService, private router: Router) { }

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
    if (this.getIsLogin()) {
      this.username = JSON.parse(sessionStorage.getItem('user')).username;
      const s = this.service.getInfo(this.username)
        .subscribe(res => {
          if (!res['success']) {
            s.unsubscribe();
            console.log(res['message']);
            this.toastr.warning('Không tìm thấy người dùng', '');
            this.router.navigate(['/home']);
          } else {
            this.client = res['message'];
          }
        }, err => {
          console.log(err);
          this.toastr.error('Lỗi rồi');
        }, () => this.subscriptions.push(s));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTotalPrice() {
    let total = 0;
    try {
      this.arrCarts.forEach(cart => {
        total += parseFloat(((cart.product.price - cart.product.price * cart.product.promotion / 100)
          * cart.amount).toString());
      });
    } catch (e) { }
    return total;
  }

  editInfoSubmit(formInfo) {
    if (formInfo.valid) {
      const sub = this.service.editInfo(formInfo.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              sessionStorage.setItem('isLogin', JSON.stringify(false));
            } else
              this.toastr.error('Sửa thất bại', 'Lỗi rồi');
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Sửa thành công', 'Thành công');
        });
    }
  }

  signInSubmit(formSignIn: NgForm) {
    if (formSignIn.valid && this.validSignIn(formSignIn)) {
      const sub = this.service.signInPost(formSignIn.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            this.toastr.warning('Tên đăng nhập hoặc mật khẩu sai', '!!!');
          } else {
            sessionStorage.setItem('user', JSON.stringify({ username: formSignIn.value.username, quyen: 1 }));
            sessionStorage.setItem('token', res['token']);
            sessionStorage.setItem('isLogin', JSON.stringify(true));
            formSignIn.reset();
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.username = JSON.parse(sessionStorage.getItem('user')).username;
          const s = this.service.getInfo(this.username)
            .subscribe(res => {
              if (!res['success']) {
                s.unsubscribe();
                console.log(res['message']);
                this.toastr.warning('Không tìm thấy người dùng', '');
                this.router.navigate(['/home']);
              } else {
                this.client = res['message'];
              }
            }, err => {
              console.log(err);
              this.toastr.error('Lỗi rồi');
            }, () => this.subscriptions.push(s));
        });
    }
  }

  validSignIn(formSignIn) {
    return !formSignIn.value.username.includes(' ');
  }

  order() {
    if (this.getIsLogin()) {
      if (this.arrCarts.length > 0) {
        const order = { username: this.username, price: this.getTotalPrice(), state: 'dat' };
        const sub = this.service.addOrder(order)
          .subscribe(res => {
            if (!res['success']) {
              sub.unsubscribe();
              console.log(res['message']);
              if (res['login']) {
                this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
                sessionStorage.setItem('isLogin', JSON.stringify(false));
              } else
                this.toastr.error('Không thể tạo đơn hàng');
            } else {
              const model = res['message'];
              try {
                this.arrCarts.forEach(e => {
                  const detail = {
                    orderId: model._id, productId: e.productId, size: e.size,
                    amount: e.amount,
                    price: parseFloat((e.product.price - e.product.price * e.product.promotion / 100).toString())
                  };
                  this.service.addDetailOrder(detail)
                    .subscribe(r => {
                      if (!r['success']) {
                        this.service.deleteOrder(model._id).subscribe();
                        sub.unsubscribe();
                        console.log(res['message']);
                        this.toastr.error('Không thể tạo chi tiết đơn hàng');
                        return;
                      }
                    }, err => {
                      sub.unsubscribe();
                      console.log(err);
                      this.toastr.error('Lỗi rồi');
                    });
                });
              } catch (e) { }
            }
          }, err => {
            console.log(err);
            this.toastr.error('Lỗi rồi');
          }, () => {
            this.subscriptions.push(sub);
            this.toastr.success('Đặt hàng thành công');
            sessionStorage.removeItem('cart');
            this.arrCarts = [];
          });
      } else {
        this.toastr.info('Giỏ hàng của bạn hiện đang trống');
      }
    } else {
      this.toastr.info('Vui lòng đăng nhập trước khi đặt hàng');
    }
  }

  getIsLogin(): Boolean {
    if (sessionStorage.getItem('isLogin'))
      return JSON.parse(sessionStorage.getItem('isLogin'));
    return false;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
