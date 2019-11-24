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

  // arrProducts = [
  //   { id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 42] },
  //   { id: '2', name: 'adidas1', color: 'blue', sex: 'nam', brand: 'Nike', promotion: 0, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 42] },
  //   { id: '3', name: 'adidas2', color: 'pink', sex: 'nữ', brand: 'Bitis', promotion: 2, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [40, 41] },
  //   { id: '4', name: 'adidas3', color: 'white', sex: 'nữ', brand: 'Bitis', promotion: 3, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 41, 42] },
  //   { id: '5', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, price: 1300, image: 'assets/img/product/giay1.jpg', sizes: [39, 41, 42] },
  //   { id: '6', name: 'adidas1', color: 'gray', sex: 'nam', brand: 'Nike', promotion: 0, price: 1300, image: 'assets/img/product/giay1.jpg', sizes: [39, 41, 42] },
  //   { id: '7', name: 'adidas2', color: 'black', sex: 'nữ', brand: 'Bitis', promotion: 2, price: 1300, image: 'assets/img/product/giay1.jpg', sizes: [40, 39, 42] },
  //   { id: '8', name: 'adidas3', color: 'black', sex: 'nữ', brand: 'Nike', promotion: 3, price: 300, image: 'assets/img/product/giay1.jpg', sizes: [40, 39, 42] },
  //   { id: '9', name: 'adidas', color: 'red', sex: 'nam', brand: 'ssdsd', promotion: 5, price: 300, image: 'assets/img/product/giay1.jpg', sizes: [40, 39, 42] },
  //   { id: '10', name: 'adidas1', color: 'blue', sex: 'nam', brand: 'Bitis', promotion: 0, price: 300, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 39] },
  //   { id: '11', name: 'adidas2', color: 'black', sex: 'nữ', brand: 'Adidas', promotion: 2, price: 1300, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 39] },
  //   { id: '12', name: 'adidas3', color: 'white', sex: 'nữ', brand: 'Nike', promotion: 3, price: 300, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 39] },
  //   { id: '13', name: 'adidas', color: 'gray', sex: 'nam', brand: 'asd', promotion: 5, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 40, 41, 42] },
  //   { id: '14', name: 'adidas1', color: 'blue', sex: 'nam', brand: 'Bitis', promotion: 0, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 40, 41, 42] },
  //   { id: '15', name: 'adidas2', color: 'gray', sex: 'nữ', brand: 'dsdsd', promotion: 2, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 40, 41, 42] },
  //   { id: '16', name: 'adidas3', color: 'white', sex: 'nữ', brand: 'asd', promotion: 3, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 40, 41, 42] },
  // ];
  arrProducts = [];
  subscriptions: Subscription[] = [];
  constructor(private service: ListProductService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
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
            this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
            this.router.navigate(['/login']);
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
        // refresh lại
        // const index = this.arrProducts.findIndex(e => e.id === id);
        // this.arrProducts.splice(index, 1);
      });
  }
}
