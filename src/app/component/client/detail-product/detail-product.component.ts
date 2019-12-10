import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailProductService } from "./detail-product.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartSessionService } from '../../../_service/cart-session.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  providers: [DetailProductService]
})
export class DetailProductComponent implements OnInit, OnDestroy {

  product = {};
  subscriptions: Subscription[] = [];
  id = '';
  constructor(private service: DetailProductService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private cartSessionService: CartSessionService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
    const sub = this.service.searchProduct(this.id)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.warning('Không tìm thầy sản phẩm', 'Sai mã sản phẩm');
          this.router.navigate(['/san-pham']);
        } else {
          this.service.getSize(this.id)
            .subscribe(size => {
              if (!size['success']) {
                sub.unsubscribe();
                console.log(res['message']);
                this.toastr.error('Lỗi lấy size sản phẩm', 'Lỗi rồi');
              } else {
                this.product = Object.assign(res['message'], { size: size['message'] });
              }
            }, err => {
              sub.unsubscribe();
              console.log(err);
              this.toastr.error('', 'Lỗi rồi');
            })
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => this.subscriptions.push(sub));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addCart(productId: string, size: Number, amount: Number) {
    if (size === null) {
      this.toastr.warning('Sản phẩm hiện tại đã hết hàng');
    } else {
      this.cartSessionService.addCart(productId, size, amount);
      this.toastr.success('Thêm vào giỏ hàng thành công');
    }
  }

  order(productId: string, size: Number, amount: Number) {
    if (size === null) {
      this.toastr.warning('Sản phẩm hiện tại đã hết hàng');
    } else {
      this.cartSessionService.addCart(productId, size, amount);
      this.toastr.success('Thêm vào giỏ hàng thành công');
      this.router.navigate(['/dat-hang']);
    }
  }

}
