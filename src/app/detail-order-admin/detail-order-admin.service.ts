import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class DetailOrderAdminService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    getDetailOrder(orderId) {
        const url = 'http://localhost:3000/detail-order/order/' + orderId;
        return this.http.get(url, { headers: this.headers });
    }

    getProduct(productId) {
        const url = 'http://localhost:3000/product/' + productId;
        return this.http.get(url);
    }

    getClient(username) {
        const url = 'http://localhost:3000/client/' + username;
        return this.http.get(url, { headers: this.headers });
    }

    getOrder(orderId) {
        const url = 'http://localhost:3000/order/' + orderId;
        return this.http.get(url, { headers: this.headers });
    }
}

