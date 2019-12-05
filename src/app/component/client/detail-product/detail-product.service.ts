import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class DetailProductService {
    constructor(private http: HttpClient) {}

    searchProduct(productId) {
        const url = 'http://localhost:3000/product/' + productId;
        return this.http.get(url);
    }

    getSize(productId){
        const url = 'http://localhost:3000/detail-product/product/' + productId;
        return this.http.get(url);
    }
}

