import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class AddEmployeeService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    addEmployee(value) {
        const url = 'http://localhost:3000/employee';
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers: this.headers });
    }

    addUser(value) {
        const url = 'http://localhost:3000/user/users'
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers: this.headers });
    }

    removeUser(username) {
        const url = 'http://localhost:3000/user/users' + username;
        return this.http.delete(url, { headers: this.headers });
    }

    getListRight() {
        const url = 'http://localhost:3000/right';
        return this.http.get(url, { headers: this.headers });
    }
}

