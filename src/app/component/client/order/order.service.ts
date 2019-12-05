import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class OrderService {
    constructor(private http: HttpClient) { }

    addOrder(value) {
        const url = 'http://localhost:3000/order/';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers: headers });
    }

    addDetailOrder(value) {
        const url = 'http://localhost:3000/detail-order/';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers: headers });
    }

    deleteOrder(id) {
        const url = 'http://localhost:3000/order/' + id;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        return this.http.delete(url, { headers: headers });
    }
    getProduct(id) {
        const url = 'http://localhost:3000/product/' + id;
        return this.http.get(url);
    }
    signInPost(value) {
        const url = 'http://localhost:3000/user/login/1';
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers });
    }

    editInfo(value) {
        const url = 'http://localhost:3000/client/' + value.username;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: headers });
    }

    getInfo(username) {
        const url = 'http://localhost:3000/client/' + username;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        return this.http.get(url, { headers: headers });
    }
}

