import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailProductService } from "./detail-product.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  providers: [DetailProductService]
})
export class DetailProductComponent implements OnInit, OnDestroy {

  product = {id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, 
              price: 3000, image: 'assets/img/product/giay1.jpg', image2: 'assets/img/product/giay1.2.jpg', 
              image3: 'assets/img/product/giay1.3.jpg', image4: 'assets/img/product/giay1.4.jpg',
              sizes: [40, 41, 42, 43]};
  subscriptions: Subscription[] = [];              
  constructor(private service: DetailProductService) { }

  ngOnInit() {
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

}
