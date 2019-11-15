import { Component, OnInit } from '@angular/core';
import { DetailOrderAdminService } from "./detail-order-admin.service";

@Component({
  selector: 'app-detail-order-admin',
  templateUrl: './detail-order-admin.component.html',
  styleUrls: ['./detail-order-admin.component.css'],
  providers: [DetailOrderAdminService]
})
export class DetailOrderAdminComponent implements OnInit {

  client = {id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', email: 'tin@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'};
  
  arrDetailOrders = [
    {id: '1', product: {id: '1', name: 'adidas', image: 'assets/img/product/giay1.jpg'}, amount: 1, price: 3000, size: 30},
    {id: '2', product: {id: '2', name: 'nike', image: 'assets/img/product/giay1.jpg'}, amount: 2, price: 3000, size: 31},
    {id: '3', product: {id: '3', name: 'hunter', image: 'assets/img/product/giay1.jpg'}, amount: 3, price: 3000, size: 32},
  ];

  order = {id: '1', date: '02/11/2019', amount: 1, price: 3000, state: 'aa'};
  constructor(service: DetailOrderAdminService) { }

  ngOnInit() {
  }

}
