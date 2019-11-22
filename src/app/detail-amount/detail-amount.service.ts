import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class DetailAmountService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

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
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: this.headers });
    }

    delete(id) {
        const url = 'http://localhost:3000/detail-product/' + id;
        return this.http.delete(url, {headers: this.headers});
    }

    add(value) {
        const url = 'http://localhost:3000/detail-product/';
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers: this.headers });
    }

}

