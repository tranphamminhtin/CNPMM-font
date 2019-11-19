import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class FixProductService {
    constructor(private http: HttpClient) {}

    searchProduct(productId) {
        const url = 'http://localhost:3000/product/' + productId;
        return this.http.get(url);
    }

    fixProduct(value, productId) {
        const url = 'http://localhost:3000/product/' + productId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: headers });
    }
}

