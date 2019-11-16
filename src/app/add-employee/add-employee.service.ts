import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class AddEmployeeService {
    constructor(private http: HttpClient) { }

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }
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
}

