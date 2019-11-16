import { Component, OnInit, OnDestroy } from '@angular/core';
import { FixRightService } from "./fix-right.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fix-right',
  templateUrl: './fix-right.component.html',
  styleUrls: ['./fix-right.component.css'],
  providers: [FixRightService]
})
export class FixRightComponent implements OnInit, OnDestroy {

  rightAdmin = false;
  rightClient = false;
  rightProduct = true;
  rightOrder = false;
  right = { id: 1, description: 'Nhóm sản phẩm' };
  subscriptions: Subscription[] = [];
  constructor(private service: FixRightService) { }

  ngOnInit() {
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
        });
    }
  }
}
