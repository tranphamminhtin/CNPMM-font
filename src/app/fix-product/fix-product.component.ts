import { Component, OnInit } from '@angular/core';
import { FixProductService } from "./fix-product.service";

@Component({
  selector: 'app-fix-product',
  templateUrl: './fix-product.component.html',
  styleUrls: ['./fix-product.component.css'],
  providers: [FixProductService]
})
export class FixProductComponent implements OnInit {

  product = {id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, 
              price: 3000, image: 'assets/img/product/giay1.jpg', image2: 'assets/img/product/giay1.2.jpg', 
              image3: 'assets/img/product/giay1.3.jpg', image4: 'assets/img/product/giay1.4.jpg',
              sizes: [40, 41, 42, 43]};
  constructor(service: FixProductService) { }

  ngOnInit() {
  }

  addProductSubmit(formAddProduct) {
    if(formAddProduct.valid) {
      console.log(formAddProduct.value);
    }
  }

}
