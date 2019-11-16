import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddRightService } from './add-right.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-right',
  templateUrl: './add-right.component.html',
  styleUrls: ['./add-right.component.css'],
  providers: [AddRightService]
})
export class AddRightComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(private service: AddRightService, private router: Router) { }

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
            alert('Thêm thất bại');
            console.log(res['message']);
            sub.unsubscribe();
          }
        }, err => {
          alert('Lỗi rồi');
          console.log(err);
        }, () => {
          this.subscriptions.push(sub);
          alert('Thêm thành công');
          this.router.navigate(['/admin/ql-quyen']);
        });
    }
  }
}
