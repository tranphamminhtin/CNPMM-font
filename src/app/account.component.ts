import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-account',
    template: `
            <div class="breadcrumb-area">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="breadcrumb-list">
                            <h1>tài khoản</h1>						
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-area">
        <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="col-md-1 hidden-xs hidden-sm"></div>
                        <div class="col-md-10 col-sm-12 col-xs-12">
                        <div class="your-account-table table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th><a routerLink="/thong-tin"><i class="fa fa-user"></i> Sửa thông tin cá nhân</a></th>
                                        <th><a routerLink="/lich-su"><i class="fa fa-history"></i> Lịch sử mua hàng</a></th>
                                    </tr>							
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><a routerLink="/doi-mk"><i class="fa fa-key"></i> Thay đổi mật khẩu</a></td>
                                        <td><a routerLink="/gio-hang"><i class="fa fa-shopping-cart"></i> Giỏ hàng</a></td>
                                    </tr>
                                    <tr>
                                        <td><a (click)="signOut();"><i class="fa fa-sign-out"></i> Đăng xuất</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                        <div class="col-md-1 hidden-xs hidden-sm"></div>
                    </div>
                </div>
            </div>
        </div>

  `
})
export class AccountComponent implements OnInit {

    constructor(private location: Location, private router: Router
        , private toastr: ToastrService) { }

    ngOnInit() {
        console.log(this.location.path());
    }

    signOut() {
        this.toastr.success('Đăng xuất thành công', 'Thành công');
    }
}
