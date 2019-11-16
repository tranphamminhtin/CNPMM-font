import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddProductService } from './add-product.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [AddProductService]
})
export class AddProductComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(private service: AddProductService, private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addProductSubmit(formAddProduct) {
    if (formAddProduct.valid) {
      console.log(formAddProduct);
      const sub = this.service.add(formAddProduct.value)
        .subscribe(res => {
          if (!res['success']) {
            alert('Thêm thất bại');
            console.log(res['message']);
            sub.unsubscribe();
          }
        }, err => {
          console.log(err);
          alert('Lỗi rồi!');
        }, () => {
          this.subscriptions.push(sub);
          alert('Thêm thành công');
          this.router.navigate(['/admin/ql-san-pham']);
        });
    }
  }
}
