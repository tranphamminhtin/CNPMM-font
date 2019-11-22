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
}

