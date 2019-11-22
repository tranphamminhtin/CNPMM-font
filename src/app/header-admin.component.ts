import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  template: `
  <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span class="sr-only">Toggle navigation</span>
					</button>
				<span class="navbar-brand">Admin</span>
				<div class="row">
					<ul class="nav navbar-top-links navbar-right">
				 	<li>
				 		<div class="col-md-12 text-right">
				 			<a class="navbar-brand fa fa-user" routerLink="/admin/home">Thông tin cá nhân</a>
				 		</div>
					</li>
				</ul>
				</div>
			</div>
		</div><!-- /.container-fluid -->
	</nav>
	<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
		<div class="profile-sidebar">
			
			<div class="profile-usertitle">
				<div class="profile-usertitle-name text-center">Quản lý GiayNePTT</div>
				<br/>
				<div class="profile-usertitle-status text-center"><span class="indicator label-success"></span>Online</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="divider"></div>
		<ul class="nav menu">
			<li><a routerLink="/admin/home"><em >&nbsp;</em> Quản lý tài khoản</a></li>
			<ng-container *ngIf="rightAdmin">
			<li class="parent "><a data-toggle="collapse" href="#sub-item-1">
				<em class="fa fa-navicon">&nbsp;</em> Quản lý nhân viên <span data-toggle="collapse"  class="icon pull-right"><em class="fa fa-plus"></em></span>
				</a>
				<ul class="children collapse" id="sub-item-1">
					<li><a class="" routerLink="/admin/ql-quyen">
						<span class="fa fa-arrow-right">&nbsp;</span> Các nhóm quyền
					</a></li>
					<li><a routerLink="/admin/ql-nhan-vien">
						<span class="fa fa-arrow-right">&nbsp;</span> Danh sách nhân viên
					</a></li>
				</ul>
			</li>
			<li><a routerLink="/admin/ql-khach-hang"><em >&nbsp;</em> Quản lý khách hàng</a></li>
			<li><a routerLink="/admin/ql-san-pham"><em >&nbsp;</em> Quản lý sản phẩm</a></li>
			<li><a routerLink="/admin/ql-don-hang"><em >&nbsp;</em> Quản lý đơn hàng</a></li>
            </ng-container>
            
            <li *ngIf="show(rightClient);"><a routerLink="/admin/ql-khach-hang"><em >&nbsp;</em> Quản lý khách hàng</a></li>	
            		
			<li *ngIf="show(rightProduct);"><a routerLink="/admin/ql-san-pham"><em >&nbsp;</em> Quản lý sản phẩm</a></li>

			<li *ngIf="show(rightOrder);"><a routerLink="/admin/ql-don-hang"><em >&nbsp;</em> Quản lý đơn hàng</a></li>
			
			<li><a (click)="logOut();"><em >&nbsp;</em> Đăng xuất</a></li>
		</ul>
	</div><!--/.sidebar-->
  `
})
export class HeaderAdminComponent {
    rightAdmin = true;
    rightClient = true;
    rightProduct = true;
    rightOrder = true;

	constructor(private router: Router) {}

    show(right : boolean): boolean {
        if(right === true && this.rightAdmin === false) {
            return true;
        }
        return false;
	}

	logOut() {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');
		this.router.navigate(['/login']);
	}
	
	// constructor(private cdRef : ChangeDetectorRef){}

    // ngAfterViewChecked() {
    //     this.cdRef.detectChanges();
    // }
}
