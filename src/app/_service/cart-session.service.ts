import { Injectable } from '@angular/core';
@Injectable()

export class CartSessionService {

    cart = [];

    getCart() {
        this.cart = JSON.parse(sessionStorage.getItem('cart')) || null;
        return this.cart
    }

    addCart(productId, size, amount) {
        this.getCart();
        if (this.cart === null) {
            this.cart = [];
            var item = { productId: productId, size: size, amount: amount };
            this.cart.push(item);
        } else {
            const index = this.cart.findIndex(e => (e.productId == productId && e.size == size));
            if (index > -1) {
                var total = parseInt(this.cart[index].amount);
                total += parseInt(amount);
                this.cart[index].amount = total;
            } else {
                var item = { productId: productId, size: size, amount: amount };
                this.cart.push(item);
            }
        }
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }

    setCart(cart) {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    getAmountCart() {
        this.getCart();
        if (this.cart === null)
            return 0;
        else {
            var total = 0;
            this.cart.forEach(e => {
                total += parseInt(e.amount);
            });
            return total;
        }
    }
}

