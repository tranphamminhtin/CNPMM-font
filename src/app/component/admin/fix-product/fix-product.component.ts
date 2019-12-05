import { Component, OnInit, OnDestroy } from '@angular/core';
import { FixProductService } from "./fix-product.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fix-product',
  templateUrl: './fix-product.component.html',
  styleUrls: ['./fix-product.component.css'],
  providers: [FixProductService]
})
export class FixProductComponent implements OnInit, OnDestroy {

  // product = {
  //   id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5,
  //   price: 3000, image: 'assets/img/product/giay1.jpg', image2: 'assets/img/product/giay1.2.jpg',
  //   image3: 'assets/img/product/giay1.3.jpg', image4: 'assets/img/product/giay1.4.jpg'
  // };
  product = {};
  subscriptions: Subscription[] = [];
  id = '';
  constructor(private service: FixProductService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (!sessionStorage.getItem('admin') && !sessionStorage.getItem('product')) {
      this.router.navigate(['/admin/home']);
    } else {
      this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
      const sub = this.service.searchProduct(this.id)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            this.router.navigate(['/admin/ql-san-pham']);
            this.toastr.warning('Không tìm thầy sản phẩm', 'Sai mã sản phẩm');
          } else {
            this.product = res['message'];
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => this.subscriptions.push(sub));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fixProductSubmit(formAddProduct) {
    if (formAddProduct.valid) {
      // console.log(formAddProduct.value);
      const sub = this.service.fixProduct(formAddProduct.value, this.id)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login']);
            } else
              this.toastr.error('Sửa thất bại', 'Lỗi rồi');
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Sửa thành công', 'Thành công');
          this.router.navigate(['/admin/ql-san-pham']);
        });
    }
  }

}
