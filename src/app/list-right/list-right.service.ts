import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ListRightService {
    constructor(private http: HttpClient) {}

    getList() {
        const url = 'http://localhost:3000/right';
        return this.http.get(url);
    }

    delete(rightId) {
        const url = 'http://localhost:3000/right/' + rightId;
        return this.http.delete(url);
    }
}

