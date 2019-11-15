import { Component, OnInit } from '@angular/core';
import { HistoryService } from "./history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [HistoryService]
})
export class HistoryComponent implements OnInit {

  arrOrders = [
    {id: '1', date: '02/11/2019', amount: 1, price: 3000, state: 'al'},
    {id: '2', date: '03/11/2019', amount: 1, price: 3000, state: 'as'},
    {id: '3', date: '04/11/2019', amount: 1, price: 3000, state: 'ad'},
    {id: '4', date: '05/11/2019', amount: 1, price: 3000, state: 'af'}
  ];
  constructor(service: HistoryService) { }

  ngOnInit() {
  }

  removeOrder(id: string) {
    const index = this.arrOrders.findIndex(order => order.id === id);
    this.arrOrders.splice(index, 1);
    alert('Xóa thành công');
  }
}
