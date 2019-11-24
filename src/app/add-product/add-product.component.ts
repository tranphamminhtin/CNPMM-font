import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddProductService } from './add-product.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [AddProductService]
})
export class AddProductComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  img = { image: '', image2: '', image3: '', image4: '' }

  constructor(private service: AddProductService, private router: Router,
    private afStorage: AngularFireStorage, private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  addProductSubmit(formAddProduct) {
    if (formAddProduct.valid && this.validImage()) {
      Object.assign(formAddProduct.value, this.img);
      // console.log(formAddProduct.value);
      const sub = this.service.add(formAddProduct.value)
        .subscribe(res => {
          if (!res['success']) {
            sub.unsubscribe();
            console.log(res['message']);
            if (res['login']) {
              this.toastr.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
              this.router.navigate(['/login']);
            } else
              this.toastr.error('Thêm thất bại', 'Lỗi');
          }
        }, err => {
          console.log(err);
          this.toastr.error('', 'Lỗi rồi!');
        }, () => {
          this.subscriptions.push(sub);
          this.toastr.success('Thêm thành công', 'Thành công');
          this.router.navigate(['/admin/ql-san-pham']);
        });
    }
  }

  validImage() {
    if (this.img.image === '' || this.img.image2 === '' || this.img.image3 === '' || this.img.image4 === '')
      return false
    return true;
  }

  onFileChange(event, value: Number) {
    // console.log(this.img[value] + '   value: ' + value);
    const file = <File>event.target.files[0];
    this.ref = this.afStorage.ref('/product/' + file.name + Date.now().toString());
    this.task = this.ref.put(file);
    this.task.snapshotChanges().pipe(
      finalize(() => this.ref.getDownloadURL().subscribe(url => {
        switch (value) {
          case 0: {
            this.img.image = url;
            break;
          }
          case 1: {
            this.img.image2 = url;
            break;
          }
          case 2: {
            this.img.image3 = url;
            break;
          }
          case 3: {
            this.img.image4 = url;
            break;
          }
          default: break;
        }
      }))
    ).subscribe();
  }
}
