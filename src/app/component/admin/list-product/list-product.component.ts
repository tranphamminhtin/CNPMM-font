import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListProductService } from "./list-product.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
  providers: [ListProductService]
})
export class ListProductComponent implements OnInit, OnDestroy {

  arrProducts = [];
  subscriptions: Subscription[] = [];
  constructor(private service: ListProductService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('admin') && !sessionStorage.getItem('product')) {
      this.router.navigate(['/admin/home']);
    } else
      this.getListProduct();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getListProduct() {
    const sub = this.service.getList()
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.warning('Lỗi lấy sản phẩm', '!!!');
        } else {
          this.arrProducts = res['message'];
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi')
      }, () => this.subscriptions.push(sub));
  }

  removeProduct(id: string) {
    const sub = this.service.delete(id)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          if (res['login']) {
            this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login'], { queryParams: { return: '/admin/ql-san-pham' } });
          } else
            this.toastr.error('Xóa thất bại');
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => {
        this.subscriptions.push(sub);
        this.toastr.success('Xóa thành công', 'Thành công');
        this.getListProduct();
      });
  }
}
