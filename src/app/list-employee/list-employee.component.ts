import { Component, OnInit } from '@angular/core';
import { ListEmployeeService } from "./list-employee.service";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  providers: [ListEmployeeService]
})
export class ListEmployeeComponent implements OnInit {

  arrEmployees = [
    {id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
    email: 'tin@gmail.com', right: {id: '1', description: 'Nhóm sản phẩm'}},
    {id: '2', username: 'tungtung', name: 'Trần Minh Tùng', numberPhone: '1234567890',
    email: 'tung@gmail.com', right: {id: '1', description: 'Nhóm khách hàng'}},
    {id: '3', username: 'tintung', name: 'Tín Tùng', numberPhone: '1234567890',
    email: 'tintung@gmail.com', right: {id: '1', description: 'Admin'}}
  ];
  constructor(service: ListEmployeeService) { }

  ngOnInit() {
  }

  addEmployee() {
    console.log('thêm');
  }

  editEmployee(id: string) {
    console.log('sửa ' + id);
  }

  removeEmployee(id: string) {
    const index = this.arrEmployees.findIndex(e => e.id === id);
    this.arrEmployees.splice(index, 1);
  }

}
