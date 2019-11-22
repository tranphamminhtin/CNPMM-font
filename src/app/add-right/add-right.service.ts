import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class AddRightService {
    constructor(private http: HttpClient) {}

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    add(value) {
        const url ='http://localhost:3000/right';
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers:this.headers });
    }
}

