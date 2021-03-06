import { Component, OnInit, OnDestroy } from '@angular/core';
import { FixRightService } from "./fix-right.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fix-right',
  templateUrl: './fix-right.component.html',
  styleUrls: ['./fix-right.component.css'],
  providers: [FixRightService]
})
export class FixRightComponent implements OnInit, OnDestroy {

  right = {};
  id = '';
  subscriptions: Subscription[] = [];
  constructor(private service: FixRightService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (!sessionStorage.getItem('admin')) {
      this.router.navigate(['/admin/home']);
    } else {
      this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
      const sub = this.service.searchRight(this.id)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login'], { queryParams: { return: '/admin/sua-quyen/' + this.id } });
            } else {
              this.toastr.warning('Không tìm thấy quyền', 'Sai mã quyền');
              this.router.navigate(['/admin/ql-quyen']);
            }
          } else {
            this.right = res['message'];
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => this.subscriptions.push(sub));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fixRightSubmit(formFixRight) {
    if (formFixRight.valid) {
      const sub = this.service.fixhRight(formFixRight.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login'], { queryParams: { return: '/admin/sua-quyen/' + this.id } });
            } else
              this.toastr.error('Sửa thất bại', 'Lỗi rồi');
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Sửa thành công', 'Thành công');
          this.router.navigate(['/admin/ql-quyen']);
        });
    }
  }
}
