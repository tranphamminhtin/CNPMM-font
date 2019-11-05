import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-right',
  templateUrl: './list-right.component.html',
  styleUrls: ['./list-right.component.css']
})
export class ListRightComponent implements OnInit {

  arrRights = [
    {id: '1', description: 'Nhóm sản phẩm'},
    {id: '2', description: 'Nhóm đơn hàng'},
    {id: '3', description: 'Nhóm nhân viên'}
  ];
  constructor() { }

  ngOnInit() {
  }

  removeRight(id: string) {
    const index = this.arrRights.findIndex(e => e.id === id);
    this.arrRights.splice(index, 1);
  }

}
