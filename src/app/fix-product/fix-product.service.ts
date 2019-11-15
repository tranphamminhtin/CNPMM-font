import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class FixProductService {
    constructor(private http: HttpClient) {}

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }

    searchProduct(productId) {
        const url = 'http://localhost:3000/product/' + productId;
        return this.http.get(url)
            .toPromise()
            .then(result => result);
    }

    fixhProduct(value, productId) {
        const url = 'http://localhost:3000/product/' + productId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: headers })
            .toPromise()
            .then(result => result);
    }
}

