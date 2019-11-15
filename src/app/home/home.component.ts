import { Component, OnInit } from '@angular/core';
import { HomeService } from "./home.service";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  arrProducts = [
    {id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, price: 3000, image: 'assets/img/product/giay1.jpg'},
    {id: '2', name: 'adidas1', color: 'blue', sex: 'nam', brand: 'Nike', promotion: 0, price: 3000, image: 'assets/img/product/giay1.jpg'},
    {id: '3', name: 'adidas2', color: 'pink', sex: 'nữ', brand: 'Adidas', promotion: 2, price: 3000, image: 'assets/img/product/giay1.jpg'},
    {id: '4', name: 'adidas3', color: 'white', sex: 'nữ', brand: 'Nike', promotion: 3, price: 3000, image: 'assets/img/product/giay1.jpg'}
  ];
  constructor(service: HomeService) { }

  ngOnInit() {
    AppComponent.isAdmin = false;
  }


  addCart(idProduct: string) {
    console.log("Thêm vào giỏ hàng");
  }

  order(idProduct: string) {
    console.log("Đặt hàng");
  }

  getPriceToSale(price: number, promotion: number): string {
      return (price - price*promotion/100).toString();
  }
}
