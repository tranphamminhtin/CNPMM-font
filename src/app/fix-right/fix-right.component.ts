import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fix-right',
  templateUrl: './fix-right.component.html',
  styleUrls: ['./fix-right.component.css']
})
export class FixRightComponent implements OnInit {

  rightAdmin = false;
  rightClient = false;
  rightProduct = true;
  rightOrder = false;
  right = {id: 1, description: 'Nhóm sản phẩm'}
  constructor() { }

  ngOnInit() {
  }

  editRightSubmit(formEditRight) {
    if(formEditRight.valid) {
      console.log(formEditRight.value);
    }
  }
}
