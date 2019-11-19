import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class AddEmployeeService {
    constructor(private http: HttpClient) { }

    addEmployee(value) {
        const url = 'http://localhost:3000/employee';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers });
    }

    addUser(value) {
        const url = 'http://localhost:3000/user/users'
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers });
    }

    removeUser(username) {
        const url = 'http://localhost:3000/user/users'+ username;
        return this.http.delete(url);
    }

    getListRight() {
        const url = 'http://localhost:3000/right';
        return this.http.get(url);
    }
}

