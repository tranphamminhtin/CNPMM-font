import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class DetailOrderService {
    constructor(private http: HttpClient) {}

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    getDetailOrder(id) {
        const url = 'http://localhost:3000/detail-order/order/' + id;
        return this.http.get(url, {headers: this.headers});
    }

    getProduct(id) {
        const url = 'http://localhost:3000/product/' + id;
        return this.http.get(url);
    }
}

