import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-employee',
  templateUrl: './account-employee.component.html',
  styleUrls: ['./account-employee.component.css']
})
export class AccountEmployeeComponent implements OnInit {

  information = {id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', numberPhone: '1234567890',
                 email: 'tin@gmail.com', right: {id: '1', description: 'Nhóm sản phẩm'}};
  constructor() { }

  ngOnInit() {
  }

}
