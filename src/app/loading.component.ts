import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-loading',
    template: ``
})

export class LoadingComponent implements OnInit, OnDestroy {
    constructor(private activatedRoute: ActivatedRoute, private router: Router,
        private http: HttpClient) { }
    id;
    state;
    subscriptions: Subscription[] = [];
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(param => {
            this.state = param.state;
            this.id = param.id;
        });
        if (this.state != null && this.id != null) {
            if (this.state == 'fb') {
                const sub = this.http.get('http://localhost:3000/user/fb/' + this.id)
                    .subscribe(res => {
                        if (!res['success']) {
                            sub.unsubscribe();
                            console.log(res['message']);
                            this.router.navigate(['/dang-nhap']);
                        } else {
                            sessionStorage.setItem('user', JSON.stringify({ username: res['username'], quyen: 1 }));
                            sessionStorage.setItem('token', res['token']);
                            sessionStorage.setItem('isLogin', JSON.stringify(true));
                        }
                    }, err => {
                        console.log(err);
                        this.router.navigate(['/dang-nhap']);
                    }, () => {
                        this.subscriptions.push(sub);
                        this.router.navigate(['/thong-tin']);
                    });
            } else {
                if (this.state == 'gg') {
                    const sub = this.http.get('http://localhost:3000/user/gg/' + this.id)
                        .subscribe(res => {
                            if (!res['success']) {
                                sub.unsubscribe();
                                console.log(res['message']);
                                this.router.navigate(['/dang-nhap']);
                            } else {
                                sessionStorage.setItem('user', JSON.stringify({ username: res['username'], quyen: 1 }));
                                sessionStorage.setItem('token', res['token']);
                                sessionStorage.setItem('isLogin', JSON.stringify(true));
                            }
                        }, err => {
                            console.log(err);
                            this.router.navigate(['/dang-nhap']);
                        }, () => {
                            this.subscriptions.push(sub);
                            this.router.navigate(['/thong-tin']);
                        });
                } else {
                    this.router.navigate(['/home']);
                }
            }
        } else {
            this.router.navigate(['/home']);
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}