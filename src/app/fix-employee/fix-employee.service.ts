import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class FixEmployeeService {
    constructor(private http: HttpClient) { }

    searchEmployee(employeeId) {
        const url = 'http://localhost:3000/employee/' + employeeId;
        return this.http.get(url);
    }

    fixhEmployee(value, id) {
        const url = 'http://localhost:3000/employee/' + id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: headers });
    }

    getListRight() {
        const url = 'http://localhost:3000/right/';
        return this.http.get(url);
    }
}

