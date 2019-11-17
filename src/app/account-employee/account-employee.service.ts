import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class AccountEmployeeService {
    constructor(private http: HttpClient) { }

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }

    changePassword(value, username) {
        const url = 'http://localhost:3000/user/users/' + username;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers: headers });
    }

    editInfo(value) {
        const url = 'http://localhost:3000/employee/' + value.username;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.put(url, body, { headers });
    }

    getRight(id) {
        const url = 'http://localhost:3000/right/' + id;
        return this.http.get(url);
    }

    getEmployee(username) {
        const url = 'http://localhost:3000/employee/' + username;
        return this.http.get(url);
    }
}

