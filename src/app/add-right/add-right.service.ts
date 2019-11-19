import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class AddRightService {
    constructor(private http: HttpClient) {}

    add(value) {
        const url ='http://localhost:3000/right';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers });
    }
}

