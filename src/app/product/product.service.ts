import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ProductService {
    constructor(private http: HttpClient) { }

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }
    getList() {
        const url = 'http://localhost:3000/product'
        return this.http.get<any[]>(url);
    }

    getDetailProduct(ProductId) {
        const url = 'http://localhost:3000/detail-product/product/' + ProductId
        return this.http.get<any[]>(url);
    }
}

