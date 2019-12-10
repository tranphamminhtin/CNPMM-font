import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from "./product.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartSessionService } from '../../../_service/cart-session.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit, OnDestroy {

 
  arrProducts = [];
  arrFilter = [];
  arrShow = [];
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
    , private toastr: ToastrService, private cartSessionService: CartSessionService) { }

  ngOnInit() {
    // this.arrFilter = this.arrProducts;
    const sub = this.service.getList()
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.warning('Lỗi lấy sản phẩm', '!!!');
        } else {
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
                sub.unsubscribe();
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
        this.arrFilter = this.arrProducts.slice(0);
        this.arrShow = this.arrProducts.slice(0, 6);
      });
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
    this.filterProduct();
  }

  add(arr: any, value: any) {
    arr.push(value);
  }

  remove(arr: any, value: any) {
    const index = arr.findIndex(e => e === value);
    arr.splice(index, 1);
  }

  filterProduct() {
    this.arrFilter = this.arrProducts.filter(product => this.search(product, this.brand, 'brand'));
    this.arrFilter = this.arrFilter.filter(product => this.search(product, this.sex, 'sex'));
    this.arrFilter = this.arrFilter.filter(product => this.search(product, this.color, 'color'));
    this.arrFilter = this.arrFilter.filter(product => this.search(product, this.size, 'size'));
    this.arrFilter = this.arrFilter.filter(product => this.search(product, this.price, 'price'));
    if (this.sortBy !== 'new')
      this.sortProducts();
    this.arrShow = this.arrFilter.slice(6 * (this.page - 1), 6 * this.page);
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
        this.filterProduct();
        break;
      }
      case 'low': {
        // this.arrFilter = this.arrProducts.slice(0);
        this.arrFilter.sort((a, b) => this.getPriceToSale(a.id) - this.getPriceToSale(b.id));
        this.arrShow = this.arrFilter.slice(6 * (this.page - 1), 6 * this.page);
        break;
      }
      case 'high': {
        // this.arrFilter = this.arrProducts.slice(0);
        this.arrFilter.sort((a, b) => this.getPriceToSale(b.id) - this.getPriceToSale(a.id));
        this.arrShow = this.arrFilter.slice(6 * (this.page - 1), 6 * this.page);
        break;
      }
    }
    // this.arrFilter = this.arrProducts.slice(6 * (this.page - 1), 6 * this.page);
  }

  getPriceToSale(id: string) {
    const product = this.arrProducts.find(e => e._id === id);
    return product.price - product.price * product.promotion / 100
  }

  changePage(page: number) {
    this.page = page;
    this.arrShow = this.arrFilter.slice(6 * (this.page - 1), 6 * this.page);
  }
}
