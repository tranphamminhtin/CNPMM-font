import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class DetailAmountService {
    constructor(private http: HttpClient) { }

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }


    getProduct(id) {
        const url = 'http://localhost:3000/product/' + id;
        return this.http.get(url);
    }

    getDetailProduct(id) {
        const url = 'http://localhost:3000/detail-product/product/' + id;
        return this.http.get<any[]>(url);
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

