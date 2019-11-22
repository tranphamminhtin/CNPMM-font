import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class FixEmployeeService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });

    searchEmployee(employeeId) {
        const url = 'http://localhost:3000/employee/' + employeeId;
        return this.http.get(url, { headers: this.headers });
    }

    fixhEmployee(value) {
        const url = 'http://localhost:3000/employee/' + value.username;
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: this.headers });
    }

    getListRight() {
        const url = 'http://localhost:3000/right/';
        return this.http.get(url, { headers: this.headers });
    }
}

