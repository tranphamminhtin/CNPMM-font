import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ListProductService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    getList() {
        const url = 'http://localhost:3000/product'
        return this.http.get(url);
    }

    delete(productId) {
        const url = 'http://localhost:3000/product/' + productId;
        return this.http.delete(url, { headers: this.headers });
    }
}

