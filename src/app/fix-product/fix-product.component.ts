import { Component, OnInit, OnDestroy } from '@angular/core';
import { FixProductService } from "./fix-product.service";
import { Subscription } from 'rxjs';
import { ALPN_ENABLED } from 'constants';

@Component({
  selector: 'app-fix-product',
  templateUrl: './fix-product.component.html',
  styleUrls: ['./fix-product.component.css'],
  providers: [FixProductService]
})
export class FixProductComponent implements OnInit, OnDestroy {

  product = {
    id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5,
    price: 3000, image: 'assets/img/product/giay1.jpg', image2: 'assets/img/product/giay1.2.jpg',
    image3: 'assets/img/product/giay1.3.jpg', image4: 'assets/img/product/giay1.4.jpg',
    sizes: [40, 41, 42, 43]
  };
  subscriptions: Subscription[] = [];
  constructor(private service: FixProductService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fixProductSubmit(formAddProduct) {
    if (formAddProduct.valid) {
      console.log(formAddProduct.value);
      const sub = this.service.fixProduct(formAddProduct.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            alert('Lỗi rồi');
          }
        }, err => {
          console.log(err);
          alert('Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          alert('Sủa thành công');
        });
    }
  }

}
