import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from "./home.service";
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit, OnDestroy {

  // arrProducts = [
  //   { id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, price: 3000, image: 'assets/img/product/giay1.jpg' },
  //   { id: '2', name: 'adidas1', color: 'blue', sex: 'nam', brand: 'Nike', promotion: 0, price: 3000, image: 'assets/img/product/giay1.jpg' },
  //   { id: '3', name: 'adidas2', color: 'pink', sex: 'nữ', brand: 'Adidas', promotion: 2, price: 3000, image: 'assets/img/product/giay1.jpg' },
  //   { id: '4', name: 'adidas3', color: 'white', sex: 'nữ', brand: 'Nike', promotion: 3, price: 3000, image: 'assets/img/product/giay1.jpg' }
  // ];
  arrProducts = [];
  allProducts = [];
  subscriptions: Subscription[] = [];
  constructor(private service: HomeService) { }

  ngOnInit() {
    AppComponent.isAdmin = false;
    const sub = this.service.getList()
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          alert('Lỗi lấy sp');
        } else {
          // console.log(res['message']);
          this.allProducts = res['message'];
          this.allProducts.reverse();
          this.arrProducts = this.allProducts.slice(0, 4);
        }
      }, err => {
        console.log(err);
        alert('Lỗi rồi');
      }, () => this.subscriptions.push(sub));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addCart(idProduct: string) {
    console.log("Thêm vào giỏ hàng");
  }

  order(idProduct: string) {
    console.log("Đặt hàng");
  }

  getPriceToSale(price: number, promotion: number): string {
    return (price - price * promotion / 100).toString();
  }
}
