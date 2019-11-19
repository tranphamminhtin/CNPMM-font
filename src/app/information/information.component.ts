import { Component, OnInit, OnDestroy } from '@angular/core';
import { InformationService } from "./information.service";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
  providers: [InformationService]
})
export class InformationComponent implements OnInit, OnDestroy {

  // client = { id: '1', username: 'tintin', name: 'Trần Phạm Minh Tín', email: 'tin@gmail.com', numberPhone: '1234567890', address: '1 Võ Văn Ngân' };
  username = 'tin';
  client = {};
  subscriptions: Subscription[] = [];
  constructor(private service: InformationService, private router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    const sub = this.service.getInfo(this.username)
      .subscribe(res => {
        if (!res['success']) {
          sub.unsubscribe();
          console.log(res['message']);
          this.toastr.warning('Không tìm thấy người dùng', '');
          this.router.navigate(['/home']);
        } else {
          // console.log(res['message']);
          this.client = res['message'];
        }
      }, err => {
        console.log(err);
        this.toastr.error('', 'Lỗi rồi');
      }, () => this.subscriptions.push(sub));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  editInfo(formInfo) {
    if (formInfo.valid) {
      console.log(formInfo.value);
      const sub = this.service.editInfo(formInfo.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            this.toastr.error('Sửa thất bại', 'Lỗi rồi');
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Thay đổi thành công', 'Thành công');
          this.router.navigate(['/account']);
        });
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
