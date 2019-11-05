import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  arrClients = [
    {id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', email: 'tin@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'},
    {id: '2', username: 'tungtung',  name: 'Trần Minh Tùng', email: 'tungtung@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'},
    {id: '3', username: 'tintung',  name: 'Tín Tùng', email: 'tintung@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'},
    {id: '4', username: 'tinne',  name: 'Tín nè', email: 'tinne@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'},
  ];
  constructor() { }

  ngOnInit() {
  }

  removeClient(id: string) {
    const index = this.arrClients.findIndex(e => e.id === id)
    this.arrClients.splice(index, 1);
  }
}
