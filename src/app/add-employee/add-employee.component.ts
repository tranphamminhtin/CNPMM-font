import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  arrRights = [
    {id: '1', description: 'Nhóm sản phẩm'},
    {id: '2', description: 'Nhóm đơn hàng'},
    {id: '3', description: 'Nhóm nhân viên'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
