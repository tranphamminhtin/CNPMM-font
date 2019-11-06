import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  client = { id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', email: 'tin@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân' };

  constructor() { }

  ngOnInit() {
  }

  editInfo(formInfo) {
    if (formInfo.valid) {
      console.log(formInfo.value);
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
