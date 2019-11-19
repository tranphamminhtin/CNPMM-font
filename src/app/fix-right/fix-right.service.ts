import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class FixRightService {
    constructor(private http: HttpClient) { }

    searchRight(rightId) {
        const url = 'http://localhost:3000/right/' + rightId;
        return this.http.get(url);
    }

    fixhRight(value) {
        const url = 'http://localhost:3000/right/' + value.id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: headers });
    }
}

