import { Component, OnInit } from '@angular/core';
import { AddRightService } from './add-right.service'

@Component({
  selector: 'app-add-right',
  templateUrl: './add-right.component.html',
  styleUrls: ['./add-right.component.css'],
  providers: [AddRightService]
})
export class AddRightComponent implements OnInit {

  constructor(service: AddRightService) { }

  ngOnInit() {
  }

  addRightSubmit(formAddRight) {
    if(formAddRight.valid) {
      console.log(formAddRight.value);
    }
  }
}
