import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-right',
  templateUrl: './add-right.component.html',
  styleUrls: ['./add-right.component.css']
})
export class AddRightComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addRightSubmit(formAddRight) {
    if(formAddRight.valid) {
      console.log(formAddRight.value);
    }
  }
}
