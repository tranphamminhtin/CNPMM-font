import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from "./product.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit, OnDestroy {

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
  arrFilter = [];
  arrNew = [];
  size = [];
  brand = [];
  sex = [];
  color = [];
  price = [];
  sortBy = 'new';
  page = 1;

  subscriptions: Subscription[] = [];
  constructor(private service: ProductService, private router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    // this.arrFilter = this.arrProducts;
    const sub = this.service.getList()
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.warning('Lỗi lấy sản phẩm', '!!!');
        } else {
          // console.log(res['message']);
          this.arrProducts = res['message'];
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
                console.log(err);
                this.toastr.error('', 'Lỗi rồi');
              });
          });
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => {
        this.subscriptions.push(sub);
        this.arrProducts.reverse();
        this.arrFilter = this.arrProducts.slice(0, 6);
        // console.log(this.arrFilter);
      });
    // console.log(this.arrProducts1);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addCart(idProduct: string) {
    console.log("Thêm vào giỏ hàng");
  }

  order(idProduct: string) {
    console.log("Đặt hàng");
    this.arrProducts = this.arrProducts.filter(function (x) {
      return x.sex === 'nam';
    })
  }

  changeCheckbox(isCheck: boolean, value: any, property: string) {
    switch (property) {
      case 'brand': {
        if (isCheck) {
          this.brand.push(value);
        } else {
          const index = this.brand.findIndex(e => e === value);
          this.brand.splice(index, 1);
        }
        break;
      }
      case 'sex': {
        if (isCheck) {
          this.sex.push(value);
        } else {
          const index = this.sex.findIndex(e => e === value);
          this.sex.splice(index, 1);
        }
        break;
      }
      case 'color': {
        if (isCheck) {
          this.color.push(value);
        } else {
          const index = this.color.findIndex(e => e === value);
          this.color.splice(index, 1);
        }
        break;
      }
      case 'size': {
        if (isCheck) {
          this.add(this.size, value);
        } else {
          const index = this.size.findIndex(e => e === value);
          this.size.splice(index, 1);
        }
        break;
      }
      case 'price': {
        this.price = [];
        this.price.push(value);
        break;
      }
      default: break;
    }
    this.filterProduct(property);
  }

  add(arr: any, value: any) {
    arr.push(value);
  }

  remove(arr: any, value: any) {
    const index = arr.findIndex(e => e === value);
    arr.splice(index, 1);
  }

  filterProduct(property: string) {
    switch (property) {
      case 'brand': {
        this.arrProducts = this.arrProducts.filter(product => this.search(product, this.brand, property));
        break;
      }
      case 'sex': {
        this.arrProducts = this.arrProducts.filter(product => this.search(product, this.sex, property));
        break;
      }
      case 'color': {
        this.arrProducts = this.arrProducts.filter(product => this.search(product, this.color, property));
        break;
      }
      case 'size': {
        this.arrProducts = this.arrProducts.filter(product => this.search(product, this.size, property));
        break;
      }
      case 'price': {
        this.arrProducts = this.arrProducts.filter(product => this.search(product, this.price, property));
        break;
      }
      default: break;
    }
    this.arrFilter = this.arrProducts.slice(6 * (this.page - 1), 6 * this.page);
  }

  search(product: any, arr: any, property: string) {
    if (arr.length === 0) {
      return true;
    }
    let flag = false;
    switch (property) {
      case 'brand': {
        arr.forEach(e => {
          if (product.brand === e) {
            flag = true;
          }
        });
        break;
      }
      case 'sex': {
        arr.forEach(e => {
          if (product.sex === e) {
            flag = true;
          }
        });
        break;
      }
      case 'color': {
        arr.forEach(e => {
          if (product.color === e) {
            flag = true;
          }
        });
        break;
      }
      case 'size': {
        arr.forEach(e => {
          product.sizes.forEach(p => {
            if (p == e) {
              flag = true;
            }
          });
        });
        break;
      }
      case 'price': {
        arr.forEach(e => {
          switch (e) {
            case 'low': {
              if (product.price < 1000)
                flag = true;
              break;
            }
            case 'normal': {
              if (product.price >= 1000 && product.price < 2000)
                flag = true;
              break;
            }
            case 'high': {
              if (product.price > 2000)
                flag = true;
              break;
            }
            default: break;
          }
        });
        break;
      }
      default: break;
    }
    return flag;
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'new': {
        this.filterProduct('brand');
        this.filterProduct('sex');
        this.filterProduct('color');
        this.filterProduct('size');
        this.filterProduct('price');
        break;
      }
      case 'low': {
        this.arrFilter = this.arrProducts.slice(0);
        this.arrFilter.sort((a, b) => this.getPriceToSale(a.id) - this.getPriceToSale(b.id));
        break;
      }
      case 'high': {
        this.arrFilter = this.arrProducts.slice(0);
        this.arrFilter.sort((a, b) => this.getPriceToSale(b.id) - this.getPriceToSale(a.id));
        break;
      }
    }
    this.arrFilter = this.arrProducts.slice(6 * (this.page - 1), 6 * this.page);
  }

  getPriceToSale(id: string) {
    const product = this.arrProducts.find(e => e._id === id);
    return product.price - product.price * product.promotion / 100
  }

  changePage(page: number) {
    this.page = page;
    this.arrFilter = this.arrProducts.slice(6 * (this.page - 1), 6 * this.page);
  }
}
