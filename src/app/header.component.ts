import { Component, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CartSessionService } from './_service/cart-session.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-header',
    template: `
  <header class="header-pos">
    <div class="header-bottom-area">
        <div class="container">
            <div class="inner-container">
                <div class="row">
                    <div class="col-md-2 col-sm-4 col-xs-5">
                        <div class="logo">
                            <a routerLink="/"><img src="assets/img/logoGiayNe.png" alt=""
                                    style="width: 90px; height: 70px;" /></a>
                        </div>
                    </div>
                    <div class="col-md-8 hidden-xs hidden-sm">
                        <div class="main-menu">
                            <nav>
                                <ul>
                                    <li><a routerLink="/">TRANG CHỦ</a>
                                    </li>
                                    <li><a routerLink="/gioi-thieu">GIỚI THIỆU</a></li>
                                    <li><a routerLink="/san-pham">GIÀY NAM</a>
                                        <ul>
                                            <li><a href="#">ADIDAS</a></li>
                                            <li><a href="#">NIKE</a></li>
                                            <li><a href="#">BITIS</a></li>
                                        </ul>
                                    </li>
                                    <li><a routerLink="/san-pham">GIÀY NỮ</a>
                                        <ul>
                                            <li><a href="#">ADIDAS</a></li>
                                            <li><a href="#">NIKE</a></li>
                                            <li><a href="#">BITIS</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">TIN TỨC</a></li>
                                    <li><a routerLink="/lien-he">LIÊN HỆ</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-8 col-xs-7 header-right">
                        <div class="my-cart">
                            <div class="total-cart">
                                <a routerLink="/gio-hang">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span id="SoLuongGioHang">{{getAmountCart()}}</span>
                                </a>
                            </div>
                        </div>
                        <div class="user-meta">
                            <a href="#"><i class="fa fa-cog"></i></a>
                            <ul *ngIf="getIsLogin()">
                                <li><a routerLink="/account">Tài khoản</a></li>
                                <li><a (click)="logOut()">Đăng xuất</a></li>
                            </ul>
                            <ul *ngIf="!getIsLogin()">
                                <li><a routerLink="/dang-nhap">Đăng nhập</a></li>
                                <li><a routerLink="/dang-ky">Đăng ký</a></li>
                            </ul>
                        </div>
                        <div class="header-search">
                            <i class="fa fa-search"></i>
                            <div class="header-form">
                                <form action="SanPhamController" method="post">
                                    <input type="text" name="timkiem" placeholder="search" />
                                    <button type="submit"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mobile-menu-area visible-xs visible-sm">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="mobile-menu">
                        <nav id="dropdown">
                            <ul>
                                <li><a href="#">Trang chủ</a></li>
                                <li><a href="#">Giới thiệu</a></li>
                                <li><a href="#">Adidas</a>
                                    <ul>
                                        <li><a href="#">Giày nam</a></li>
                                        <li><a href="#">Giày nữ</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Nike</a>
                                    <ul>
                                        <li><a href="#">Giày nam</a></li>
                                        <li><a href="#">Giày nữ</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Bitis</a>
                                    <ul>
                                        <li><a href="#">Giày nam</a></li>
                                        <li><a href="#">Giày nữ</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Tin tức</a></li>
                                <li><a href="#">Liên hệ</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </header>
  `,
    providers: [CartSessionService]
})
export class HeaderComponent implements AfterViewChecked {

    constructor(private cartService: CartSessionService, private router: Router,
        private toastr: ToastrService, private cdRef: ChangeDetectorRef) { }

    getIsLogin(): Boolean {
        if (sessionStorage.getItem('isLogin'))
            return JSON.parse(sessionStorage.getItem('isLogin'));
        return false;
    }

    // constructor(private cdRef : ChangeDetectorRef){}

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    logOut() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isLogin');
        this.toastr.success('Đăng xuất thành công');
        this.router.navigate(['/home']);
    }

    getAmountCart() {
        return this.cartService.getAmountCart();
    }
}