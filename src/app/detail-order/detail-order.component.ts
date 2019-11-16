import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailOrderService } from "./detail-order.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css'],
  providers: [DetailOrderService]
})
export class DetailOrderComponent implements OnInit, OnDestroy {

  arrDetailOrders = [
    {id: '1', product: {id: '1', name: 'adidas', image: 'assets/img/product/giay1.jpg'}, amount: 1, price: 3000, size: 30},
    {id: '2', product: {id: '2', name: 'nike', image: 'assets/img/product/giay1.jpg'}, amount: 2, price: 3000, size: 31},
    {id: '3', product: {id: '3', name: 'hunter', image: 'assets/img/product/giay1.jpg'}, amount: 3, price: 3000, size: 32},
  ];
  subscriptions: Subscription[] = [];
  constructor(private service: DetailOrderService) { }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTotalPrice() {
    let total = 0;
    this.arrDetailOrders.forEach(detailOrder => total += detailOrder.amount * detailOrder.price);
    return total;
  }

}
