import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class DetailAmountService {
    constructor(private http: HttpClient) { }

    getProduct(id) {
        const url = 'http://localhost:3000/product/' + id;
        return this.http.get(url);
    }

    getDetailProduct(productId) {
        const url = 'http://localhost:3000/detail-product/product/' + productId;
        return this.http.get(url);
    }

    fix(value, id) {
        const url = 'http://localhost:3000/detail-product/' + id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: headers });
    }

    delete(id) {
        const url = 'http://localhost:3000/detail-product/' + id;
        return this.http.delete(url);
    }

    add(value) {
        const url = 'http://localhost:3000/detail-product/';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers: headers });
    }

}

