import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class ListEmployeeService {
    constructor(private http: HttpClient) {}

    getList() {
        const url = 'http://localhost:3000/employee';
        return this.http.get(url);
    }

    delete(username) {
        const url = 'http://localhost:3000/employee/' + username;
        return this.http.delete(url);
    }

    getRight(rightId) {
        const url = 'http://localhost:3000/right/' + rightId;
        return this.http.get(url);
    }
}

