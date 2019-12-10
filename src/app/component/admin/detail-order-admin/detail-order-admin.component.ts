import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailOrderAdminService } from "./detail-order-admin.service";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-order-admin',
  templateUrl: './detail-order-admin.component.html',
  styleUrls: ['./detail-order-admin.component.css'],
  providers: [DetailOrderAdminService]
})
export class DetailOrderAdminComponent implements OnInit, OnDestroy {

  client = {};
  arrDetailOrders = [];
  order = {};
  subscriptions: Subscription[] = [];
  id = '';
  constructor(private service: DetailOrderAdminService, private activatedRoute: ActivatedRoute
    , private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('admin') && !sessionStorage.getItem('order')) {
      this.router.navigate(['/admin/home']);
    } else {
      this.id = this.activatedRoute.snapshot.paramMap.get('id').toString();
      const sub = this.service.getOrder(this.id)
        .subscribe(order => {
          if (!order['success']) {
            sub.unsubscribe();
            console.log(order['message']);
            if (order['login']) {
              this.toastr.warning('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login'], { queryParams: { return: '/admin/chi-tiet-don-hang-ad/' + this.id } });
            } else
              this.toastr.error('Lỗi lấy thông tin đơn hàng');
          } else {
            this.order = order['message'];
            this.service.getClient(this.order['username'])
              .subscribe(client => {
                if (!client['success']) {
                  sub.unsubscribe();
                  console.log(client['message']);
                  this.toastr.error('Lỗi lấy thông tin người dùng');
                } else {
                  this.client = client['message'];
                }
              }, err => {
                sub.unsubscribe();
                console.log(err);
                this.toastr.error('Lỗi rồi');
              });
          }
        }, err => {
          console.log(err);
          this.toastr.error('Lỗi rồi');
        }, () => {
          this.subscriptions.push(sub);
          const sub3 = this.service.getDetailOrder(this.id)
            .subscribe(detail => {
              if (!detail['success']) {
                sub3.unsubscribe();
                console.log(detail['message']);
                this.toastr.error('Lỗi lấy chi tiết đơn hàng');
              } else {
                this.arrDetailOrders = detail['message'];
                this.arrDetailOrders.forEach(e => {
                  this.service.getProduct(e.productId)
                    .subscribe(product => {
                      if (!product['success']) {
                        sub.unsubscribe();
                        this.toastr.error('Lỗi lấy sản phẩm');
                        console.log(product['message']);
                      } else {
                        Object.assign(e, { product: product['message'] });
                      }
                    }, err => {
                      sub.unsubscribe();
                      this.toastr.error('Lỗi rồi');
                      console.log(err);
                    });
                });
              }
            }, err => {
              console.log(err);
              this.toastr.error('Lỗi rồi');
            }, () => this.subscriptions.push(sub3));
        });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
