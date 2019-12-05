import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ListOrderService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    getList() {
        const url = 'http://localhost:3000/order'
        return this.http.get(url, { headers: this.headers });
    }

    getTotal(orderId) {
        const url = 'http://localhost:3000/order/getTotal/' + orderId;
        return this.http.get(url, { headers: this.headers });
    }

    delete(orderId) {
        const url = 'http://localhost:3000/order/' + orderId;
        return this.http.delete(url, { headers: this.headers });
    }

    updateOrder(value) {
        const url = 'http://localhost:3000/order/' + value._id;
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: this.headers });
    }

    deleteDetail(orderId) {
        const url = 'http://localhost:3000/detail-order/' + orderId;
        return this.http.delete(url, { headers: this.headers });
    }

    getDetail(orderId) {
        const url = 'http://localhost:3000/detail-order/order/' + orderId;
        return this.http.get(url, { headers: this.headers });
    }

    sendMail(value) {
        const url = 'http://localhost:3000/mail/';
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers: this.headers });
    }
}

