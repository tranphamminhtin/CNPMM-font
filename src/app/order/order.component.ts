import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  isLogin = true;
  client = {id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', email: 'tin@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân'};
  arrCarts = [
    {id: '1', product: {id: '1', name: 'adidas', image: 'assets/img/product/giay1.jpg'}, amount: 1, price: 3000, size: 30},
    {id: '2', product: {id: '2', name: 'nike', image: 'assets/img/product/giay1.jpg'}, amount: 2, price: 3000, size: 31},
    {id: '3', product: {id: '3', name: 'hunter', image: 'assets/img/product/giay1.jpg'}, amount: 3, price: 3000, size: 32},
  ];
  constructor() { }

  ngOnInit() {
  }

  getTotalPrice() {
    let total = 0;
    this.arrCarts.forEach(cart => total += cart.amount*cart.price);
    return total;
  }

  editInfoSubmit(formInfo) {
    if(formInfo.valid) {
      console.log(formInfo.value);
    }
  }

  signInSubmit(formSignIn) {
    if(formSignIn.valid && this.validSignIn(formSignIn)) {
      console.log(formSignIn.value);
    }
  }

  validSignIn(formSignIn) {
    return !formSignIn.value.username.includes(' ');
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
