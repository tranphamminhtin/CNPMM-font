import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  product = {id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, 
              price: 3000, image: 'assets/img/product/giay1.jpg', image2: 'assets/img/product/giay1.2.jpg', 
              image3: 'assets/img/product/giay1.3.jpg', image4: 'assets/img/product/giay1.4.jpg',
              sizes: [40, 41, 42, 43]};
  constructor() { }

  ngOnInit() {
  }

  addCart(idProduct: string) {
    console.log("Thêm vào giỏ hàng");
  }

  order(idProduct: string) {
    console.log("Đặt hàng");
  }

}
