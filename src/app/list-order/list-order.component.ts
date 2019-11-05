import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  arrOrder = [
    {id: '1', date: '02/11/2019', amount: 1, price: 3000, state: 'aa', username: 'tintin'},
    {id: '2', date: '03/11/2019', amount: 1, price: 3000, state: 'as', username: 'tintin'},
    {id: '3', date: '04/11/2019', amount: 1, price: 3000, state: 'ad', username: 'tintin'},
    {id: '4', date: '05/11/2019', amount: 1, price: 3000, state: 'ad', username: 'tintin'}
  ];
  arrFiltered = [];
  isDone = false;
  stateShow = 'aa';
  constructor() { }

  ngOnInit() {
    this.arrFiltered = this.arrOrder.filter(e => e.state === this.stateShow);
  }

  show(state: string) {
    this.stateShow = state;
    this.arrFiltered = this.arrOrder.filter(e => e.state === this.stateShow);
    if(state === 'ad') {
      this.isDone = true;
    }
  }

  removeOrder(id: string) {
    const index = this.arrFiltered.findIndex(e => e.id === id);
    this.arrFiltered.splice(index, 1);
  }

  next(id: string) {
    console.log(id);
  }
}
