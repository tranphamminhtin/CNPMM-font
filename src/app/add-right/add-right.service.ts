import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class AddRightService {
    constructor(private http: HttpClient) {}

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }

    add(value) {
        const url ='http://localhost:3000/right';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers });
    }
}

