import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListClientService } from "./list-client.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  providers: [ListClientService]
})
export class ListClientComponent implements OnInit, OnDestroy {

  arrClients = [
    {id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', email: 'tin@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'},
    {id: '2', username: 'tungtung',  name: 'Trần Minh Tùng', email: 'tungtung@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'},
    {id: '3', username: 'tintung',  name: 'Tín Tùng', email: 'tintung@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'},
    {id: '4', username: 'tinne',  name: 'Tín nè', email: 'tinne@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'},
  ];
  subscriptions: Subscription[] = [];
  constructor(private service: ListClientService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  removeClient(username: string) {
    const sub = this.service.delete(username)
    .subscribe(res => {
      if(!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        alert('Lỗi rồi');
      }
    }, err => {
      console.log(err);
      alert('Lỗi rồi');
    }, () => {
      this.subscriptions.push(sub);
      alert('Xóa thành công');
      // refresh lại
      // const index = this.arrClients.findIndex(e => e.id === id)
      // this.arrClients.splice(index, 1);
    });
  }
}
