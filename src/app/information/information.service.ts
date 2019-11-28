import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class InformationService {
    constructor(private http: HttpClient) { }



    editInfo(value) {
        const url = 'http://localhost:3000/client/' + value.username;
        const body = JSON.stringify(value);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        return this.http.put(url, body, { headers: headers });
    }

    getInfo(username) {
        const url = 'http://localhost:3000/client/' + username;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        });
        return this.http.get(url, { headers: headers });
    }
}

