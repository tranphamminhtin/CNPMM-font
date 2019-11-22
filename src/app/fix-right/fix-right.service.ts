import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class FixRightService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    searchRight(rightId) {
        const url = 'http://localhost:3000/right/' + rightId;
        return this.http.get(url, { headers: this.headers });
    }

    fixhRight(value) {
        const url = 'http://localhost:3000/right/' + value.id;
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: this.headers });
    }
}

