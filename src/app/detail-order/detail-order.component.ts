import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailOrderService } from "./detail-order.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css'],
  providers: [DetailOrderService]
})
export class DetailOrderComponent implements OnInit, OnDestroy {

  // arrDetailOrders = [
  //   { id: '1', product: { id: '1', name: 'adidas', image: 'assets/img/product/giay1.jpg' }, amount: 1, price: 3000, size: 30 },
  //   { id: '2', product: { id: '2', name: 'nike', image: 'assets/img/product/giay1.jpg' }, amount: 2, price: 3000, size: 31 },
  //   { id: '3', product: { id: '3', name: 'hunter', image: 'assets/img/product/giay1.jpg' }, amount: 3, price: 3000, size: 32 },
  // ];
  arrDetailOrders = [];
  subscriptions: Subscription[] = [];
  constructor(private service: DetailOrderService, private activatedRoute: ActivatedRoute
    , private toastr: ToastrService, private router: Router) { }

  id = '';
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
    const sub = this.service.getDetailOrder(this.id)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.error('Lỗi lấy chi tiết đơn hàng');
        } else {
          this.arrDetailOrders = res['message'];
          this.arrDetailOrders.forEach(e => {
            this.service.getProduct(e.productId)
              .subscribe(product => {
                if (!product['success']) {
                  sub.unsubscribe();
                  this.toastr.error('Lỗi lấy sản phẩm');
                  console.log(product['message']);
                } else {
                  Object.assign(e, { product: product['message'] });
                }
              }, err => {
                sub.unsubscribe();
                this.toastr.error('Lỗi rồi');
                console.log(err);
              });
          });
        }
      }, err => {
        this.toastr.error('Lỗi rồi');
        console.log(err);
      }, () => this.subscriptions.push(sub));
      if(this.arrDetailOrders.length === 0){
        this.router.navigate(['/home']);
      }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTotalPrice() {
    let total = 0;
    try {
      this.arrDetailOrders.forEach(detailOrder => total += detailOrder.amount * detailOrder.price);
    } catch (e) { }
    return total;
  }

}
