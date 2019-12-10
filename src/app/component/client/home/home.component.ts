import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from "./home.service";
import { AppComponent } from '../../../app.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CartSessionService } from '../../../_service/cart-session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit, OnDestroy {

  arrProducts = [];
  allProducts = [];
  subscriptions: Subscription[] = [];
  constructor(private service: HomeService, private toastr: ToastrService,
    private router: Router, private cartSessionService: CartSessionService) { }

  token;
  id;
  ngOnInit() {
    AppComponent.isAdmin = false;
    const sub = this.service.getList()
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.error('Lỗi lấy sản phẩm', 'Lỗi rồi');
        } else {
          this.allProducts = res['message'];
          this.allProducts.reverse();
          this.arrProducts = this.allProducts.slice(0, 4);
          this.arrProducts.forEach(product => {
            this.service.getSize(product._id)
              .subscribe(size => {
                if (!size['success']) {
                  sub.unsubscribe();
                  console.log(size['message']);
                  this.toastr.error('Lỗi lấy size', 'Lỗi rồi');
                } else {
                  Object.assign(product, { size: size['message'] });
                }
              }, err => {
                sub.unsubscribe();
                console.log(err);
                this.toastr.error('', 'Lỗi rồi');
              });
          });
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => this.subscriptions.push(sub));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addCart(productId: string, size, amount) {
    if (size.length === 0) {
      this.toastr.warning('Sản phẩm hiện tại đã hết hàng');
    } else {
      this.cartSessionService.addCart(productId, size[0].size, amount);
      this.toastr.success('Thêm vào giỏ hàng thành công');
    }
  }

  order(productId: string, size, amount) {
    if (size.length === 0) {
      this.toastr.warning('Sản phẩm hiện tại đã hết hàng');
    } else {
      this.cartSessionService.addCart(productId, size[0].size, amount);
      this.toastr.success('Thêm vào giỏ hàng thành công');
      this.router.navigate(['/dat-hang']);
    }
  }

  getPriceToSale(price: number, promotion: number): string {
    return (price - price * promotion / 100).toString();
  }
}
