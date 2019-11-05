import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  arrCarts = [
    {id: '1', product: {id: '1', name: 'adidas', image: 'assets/img/product/giay1.jpg'}, amount: 1, price: 3000, size: 30},
    {id: '2', product: {id: '2', name: 'nike', image: 'assets/img/product/giay1.jpg'}, amount: 2, price: 3000, size: 31},
    {id: '3', product: {id: '3', name: 'hunter', image: 'assets/img/product/giay1.jpg'}, amount: 3, price: 3000, size: 32},
  ];
  constructor() { }

  ngOnInit() {
  }

  getTotalPrice(): number {
    let total = 0;
    this.arrCarts.forEach(cart => {total += cart.price*cart.amount;})
    return total;
  }

  updateCart(id: string, amount: number) {
    alert('update id: '+ id + " amount: " + amount);
  }

  removeCart(id: string) {
    const index = this.arrCarts.findIndex(cart => cart.id === id);
    this.arrCarts.splice(index, 1);
  }
}
