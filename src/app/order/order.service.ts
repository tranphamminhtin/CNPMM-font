import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class OrderService {
    constructor(private http: HttpClient) {}

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }

    getDetailCart(username) {
        const url = 'http://localhost:3000/detail-order/cart/' + username;
        return this.http.get<any[]>(url);
    }

    getProduct(id) {
        const url = 'http://localhost:3000/product/' + id;
        return this.http.get(url);
    }
    signInPost(value) {
        const url ='http://localhost:3000/user/login/1'
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers });
    }

    editInfo(value) {
        const url ='http://localhost:3000/client/' + value.username;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers });
    }
}

