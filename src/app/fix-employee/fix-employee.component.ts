import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fix-employee',
  templateUrl: './fix-employee.component.html',
  styleUrls: ['./fix-employee.component.css']
})
export class FixEmployeeComponent implements OnInit {

  employee = {id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
              email: 'tin@gmail.com', right: {id: '1', description: 'Nhóm sản phẩm'}};
  user = {id: '1', username: 'tintin', password: '123456'};
  arrRights = [
    {id: '1', description: 'Nhóm sản phẩm'},
    {id: '2', description: 'Nhóm đơn hàng'},
    {id: '3', description: 'Nhóm nhân viên'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
