import { NgModule, OnInit, OnDestroy } from "@angular/core";
import { ChangePasswordComponent } from './change-password.component'
import { Routes, RouterModule, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const routesConfig: Routes = [
    { path: 'doi-mk', component: ChangePasswordComponent }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ChangePasswordComponent]
})

export class ChangePasswordModule implements OnInit, OnDestroy {

    username = ''
    constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) { }

    ngOnInit() { }
    subscriptions: Subscription[] = [];
    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    changePasswordSubmit(formChangePassword) {
        if (formChangePassword.valid) {
            const url = 'http://localhost:3000/user/users/' + this.username;
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            const body = JSON.stringify(formChangePassword.value);
            const sub = this.http.put(url, body, { headers: headers })
                .subscribe(res => {
                    if (!res['success']) {
                        console.log(res['message']);
                        this.toastr.error('Đổi mật khẩu thất bại', 'Lỗi rồi!');
                        sub.unsubscribe();
                    }
                }, err => {
                    console.log(err);
                    this.toastr.error('', 'Lỗi rồi')
                }, () => {
                    this.subscriptions.push(sub);
                    this.toastr.success('Đổi mật khẩu thành công', 'Thành công');
                    this.router.navigate(['/account']);
                });
        }
    }
}