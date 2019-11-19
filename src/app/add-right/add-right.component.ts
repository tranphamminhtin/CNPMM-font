import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddRightService } from './add-right.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-right',
  templateUrl: './add-right.component.html',
  styleUrls: ['./add-right.component.css'],
  providers: [AddRightService]
})
export class AddRightComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(private service: AddRightService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addRightSubmit(formAddRight) {
    if (formAddRight.valid) {
      console.log(formAddRight.value);
      const sub = this.service.add(formAddRight.value)
        .subscribe(res => {
          if (!res['success']) {
            this.toastr.error('Thêm thất bại', 'Lỗi');
            console.log(res['message']);
            sub.unsubscribe();
          }
        }, err => {
          this.toastr.error('', 'Lỗi rồi');
          console.log(err);
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Thêm thành công', 'Thành công');
          this.router.navigate(['/admin/ql-quyen']);
        });
    }
  }
}
