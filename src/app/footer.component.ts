import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
    <div class="brand-area">
        <div class="container">
            <div class="brand-inner-container pad-60">
                <div class="row">
                    <div class="brand-curosel">
                        <div class="col-md-2"></div>
                        <div class="col-md-1">
                            <div class="single-brand">
                                <a href="#"><img src="assets/img/brand/brand1.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="single-brand">
                                <a href="#"><img src="assets/img/brand/brand2.jpg" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="single-brand">
                                <a href="#"><img src="assets/img/brand/brand3.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="single-brand">
                                <a href="#"><img src="assets/img/brand/brand4.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="single-brand">
                                <a href="#"><img src="assets/img/brand/brand8.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="single-brand">
                                <a href="#"><img src="assets/img/brand/brand5.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="single-brand">
                                <a href="#"><img src="assets/img/brand/brand6.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="single-brand">
                                <a href="#"><img src="assets/img/brand/brand7.png" alt="" /></a>
                            </div>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="footer-top-area">
            <div class="container">
                <div class="row">
                    <!-- footer-widget start -->
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="footer-widget">
                            <h3>Liên Hệ</h3>
                            <ul class="footer-contact">
                                <li>
                                    <i class="fa fa-map-marker"> </i>
                                    Địa chỉ: DH SPKT TP-HCM
                                </li>
                                <li>
                                    <i class="fa fa-envelope"> </i>
                                    Email: ute@student.hcmute.edu.vn
                                </li>
                                <li>
                                    <i class="fa fa-phone"> </i>
                                    Phone: +123456789
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 hidden-sm">
                        <div class="footer-widget">
                            <h3>Thông tin GIAYNE</h3>
                            <ul class="footer-menu">
                                <li><a routerLink="/gioi-thieu">Giới thiệu</a></li>
                                <li><a routerLink="/san-pham">Sản phẩm</a></li>
                                <li><a routerLink="/lien-he">Liên hệ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <div class="footer-widget">
                            <h3>Tài Khoản</h3>
                            <ul class="footer-menu">
                                <li *ngIf="getIsLogin()"><a routerLink="TaiKhoanController">Tài khoản</a></li>
                                <li *ngIf="!getIsLogin()"><a routerLink="login.jsp">Đăng nhập</a></li>
                                <li><a routerLink="/lien-he">Liên hệ với GIAYNE</a></li>
                                <li *ngIf="getIsLogin()"><a routerLink="/lich-su">Lịch sử mua hàng</a></li>
                                <li><a routerLink="/gio-hang">Giỏ hàng</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  `
})
export class FooterComponent {
    constructor(private cdRef: ChangeDetectorRef) { }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    getIsLogin(): Boolean {
        if (sessionStorage.getItem('isLogin'))
            return JSON.parse(sessionStorage.getItem('isLogin'));
        return false;
    }
}