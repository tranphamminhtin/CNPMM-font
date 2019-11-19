import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ListOrderService {
    constructor(private http: HttpClient) {}

    getList() {
        const url = 'http://localhost:3000/order'
        return this.http.get(url);
    }

    getTotal(orderId) {
        const url = 'http://localhost:3000/order/getTotal/' + orderId;
        return this.http.get(url);
    }

    delete(orderId) {
        const url = 'http://localhost:3000/order/' + orderId;
        return this.http.delete(url);
    }
}

