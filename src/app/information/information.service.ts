import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class InformationService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    editInfo(value) {
        const url = 'http://localhost:3000/client/' + value.username;
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: this.headers });
    }

    getInfo(username) {
        const url = 'http://localhost:3000/client/' + username;
        return this.http.get(url, { headers: this.headers });
    }
}

