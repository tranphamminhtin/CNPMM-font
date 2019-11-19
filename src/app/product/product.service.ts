import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ProductService {
    constructor(private http: HttpClient) { }

    getList() {
        const url = 'http://localhost:3000/product'
        return this.http.get(url);
    }

    getSize(ProductId) {
        const url = 'http://localhost:3000/detail-product/product/' + ProductId
        return this.http.get(url);
    }
}

