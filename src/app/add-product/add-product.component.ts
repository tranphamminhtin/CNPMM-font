import { Component, OnInit } from '@angular/core';
import { AddProductService } from './add-product.service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [AddProductService]
})
export class AddProductComponent implements OnInit {

  constructor(service: AddProductService) { }

  ngOnInit() {
  }

  addProductSubmit(formAddProduct) {
    if(formAddProduct.valid) {
      console.log(formAddProduct);
    }
  }
}
