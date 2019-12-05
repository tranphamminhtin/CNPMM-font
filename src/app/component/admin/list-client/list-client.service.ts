import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ListClientService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    getList() {
        const url = 'http://localhost:3000/client';
        return this.http.get(url, { headers: this.headers });
    }

    delete(username) {
        const url = 'http://localhost:3000/client/' + username;
        return this.http.delete(url, { headers: this.headers });
    }
}

