import { Component, OnInit } from '@angular/core';
import { DetailAmountService } from "./detail-amount.service";

@Component({
  selector: 'app-detail-amount',
  templateUrl: './detail-amount.component.html',
  styleUrls: ['./detail-amount.component.css'],
  providers: [DetailAmountService]
})
export class DetailAmountComponent implements OnInit {

  product = {id: '1', name: 'adidas1'};
  arrAmounts = [
    {size: 39, amount: 20},
    {size: 40, amount: 40},
    {size: 41, amount: 41},
    {size: 42, amount: 42}
  ];
  constructor(service: DetailAmountService) { }

  ngOnInit() {
  }

  addAmount(id: string, size: number, amount: number) {
    if(size > 30 && size < 100 && amount > 0) {
      console.log('thêm '+ id +'size: ' + size + 'số lượng: ' + amount);
    }
    // let a = {size: size, amount: amount};
    // this.arrAmounts.unshift(a);
  }

  editAmount(id: string, size: number, amount: number) {
    const index = this.arrAmounts.findIndex(e => e.size === size);
    this.arrAmounts[index].amount = amount;
  }

  removeAmount(id: string, size: number) {
    const index = this.arrAmounts.findIndex(e => e.size === size);
    this.arrAmounts.splice(index, 1);
  }

}
