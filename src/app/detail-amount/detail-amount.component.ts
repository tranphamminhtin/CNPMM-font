import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-amount',
  templateUrl: './detail-amount.component.html',
  styleUrls: ['./detail-amount.component.css']
})
export class DetailAmountComponent implements OnInit {

  product = {id: '1', name: 'adidas1'};
  arrAmounts = [
    {size: 39, amount: 20},
    {size: 40, amount: 40},
    {size: 41, amount: 41},
    {size: 42, amount: 42}
  ];
  constructor() { }

  ngOnInit() {
  }

  addAmount(id: string, size: number, amount: number) {
    console.log('thêm '+ id +'size: ' + size + 'số lượng: ' + amount);
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
