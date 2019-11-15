import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ListOrderService {
    constructor(private http: HttpClient) {}

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }

    getList() {
        const url = 'http://localhost:3000/order'
        return this.http.get<any[]>(url).toPromise().then(result => result);
    }

    getTotal(orderId) {
        const url = 'http://localhost:3000/order/getTotal/' + orderId;
        return this.http.get(url).toPromise().then(result => result);
    }

    delete(orderId) {
        const url = 'http://localhost:3000/order/' + orderId;
        return this.http.delete(url).toPromise().then(result => result);
    }
}

