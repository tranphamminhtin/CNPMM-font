import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class DetailOrderAdminService {
    constructor(private http: HttpClient) { }

    getDetailOrder(id) {
        const url = 'http://localhost:3000/detail-order/order/' + id;
        return this.http.get(url);
    }

    getProduct(id) {
        const url = 'http://localhost:3000/product/' + id;
        return this.http.get(url);
    }

    getClient(id) {
        const url = 'http://localhost:3000/client/' + id;
        return this.http.get(url);
    }

    getOrder(id) {
        const url = 'http://localhost:3000/order/' + id;
        return this.http.get(url);
    }
}

