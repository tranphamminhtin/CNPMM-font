import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable()

export class SignService {
    constructor(private http: HttpClient) { }

    // sendPost(value) {
    //     const url ='http://localhost:3000/signin'
    //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //     const body = JSON.stringify(value);
    //     return this.http.post(url, body, { headers })
    //     .toPromise()
    //     .then(res => res);
    // }

    signInPost(value) {
        const url = 'http://localhost:3000/user/login/1'
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
            .toPromise()
            .then(res => res);
    }

    signUpPost(value) {
        const url = 'http://localhost:3000/user/users'
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
            .toPromise()
            .then(res => res);
    }

    createClient(value) {
        const url = 'http://localhost:3000/client'
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
            .toPromise()
            .then(res => res);
    }

    removeUser(username) {
        const url = 'http://localhost:3000/user/users/' + username;
        return this.http.delete(url).toPromise().then(res => res);
    }

}

