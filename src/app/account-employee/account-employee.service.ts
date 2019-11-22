import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class AccountEmployeeService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    changePassword(value, username) {
        const url = 'http://localhost:3000/user/users/' + username;
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: this.headers });
    }

    editInfo(value) {
        const url = 'http://localhost:3000/employee/' + value.username;
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: this.headers });
    }

    getRight(id) {
        const url = 'http://localhost:3000/right/' + id;
        return this.http.get(url, { headers: this.headers });
    }

    getEmployee(username) {
        const url = 'http://localhost:3000/employee/' + username;
        return this.http.get(url, { headers: this.headers });
    }
}

