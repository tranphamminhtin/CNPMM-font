import { Component, OnInit, OnDestroy } from '@angular/core';
import { FixRightService } from "./fix-right.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fix-right',
  templateUrl: './fix-right.component.html',
  styleUrls: ['./fix-right.component.css'],
  providers: [FixRightService]
})
export class FixRightComponent implements OnInit, OnDestroy {

  // rightAdmin = false;
  // rightClient = false;
  // rightProduct = true;
  // rightOrder = false;
  // right = { id: 1, description: 'Nhóm sản phẩm' };
  right = {};
  id = '';
  subscriptions: Subscription[] = [];
  constructor(private service: FixRightService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
    const sub = this.service.searchRight(this.id)
    .subscribe(res => {
      if(!res['success']) {
        sub.unsubscribe();
        console.log(res['message']);
        alert('Không tìm thấy quyền');
        this.router.navigate(['/admin/ql-quyen']);
      } else {
        this.right = res['message'];
      }
    }, err => {
      console.log(err);
      alert('Lỗi rồi');
    }, () => this.subscriptions.push(sub));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fixRightSubmit(formFixRight) {
    if (formFixRight.valid) {
      console.log(formFixRight.value);
      const sub = this.service.fixhRight(formFixRight.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            alert('Lỗi rồi');
          }
        }, err => {
          console.log(err);
          alert('Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          alert('Sửa thành công');
          this.router.navigate(['/admin/ql-quyen']);
        });
    }
  }
}
