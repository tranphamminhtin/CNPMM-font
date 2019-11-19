import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ListClientService {
    constructor(private http: HttpClient) {}

    getList() {
        const url = 'http://localhost:3000/client';
        return this.http.get(url);
    }

    delete(username) {
        const url = 'http://localhost:3000/client/' + username;
        return this.http.delete(url);
    }
}

