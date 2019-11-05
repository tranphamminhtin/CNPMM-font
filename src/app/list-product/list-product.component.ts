import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  arrProducts = [
    { id: '1', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 42] },
    { id: '2', name: 'adidas1', color: 'blue', sex: 'nam', brand: 'Nike', promotion: 0, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 42] },
    { id: '3', name: 'adidas2', color: 'pink', sex: 'nữ', brand: 'Bitis', promotion: 2, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [40, 41] },
    { id: '4', name: 'adidas3', color: 'white', sex: 'nữ', brand: 'Bitis', promotion: 3, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 41, 42] },
    { id: '5', name: 'adidas', color: 'red', sex: 'nam', brand: 'Adidas', promotion: 5, price: 1300, image: 'assets/img/product/giay1.jpg', sizes: [39, 41, 42] },
    { id: '6', name: 'adidas1', color: 'gray', sex: 'nam', brand: 'Nike', promotion: 0, price: 1300, image: 'assets/img/product/giay1.jpg', sizes: [39, 41, 42] },
    { id: '7', name: 'adidas2', color: 'black', sex: 'nữ', brand: 'Bitis', promotion: 2, price: 1300, image: 'assets/img/product/giay1.jpg', sizes: [40, 39, 42] },
    { id: '8', name: 'adidas3', color: 'black', sex: 'nữ', brand: 'Nike', promotion: 3, price: 300, image: 'assets/img/product/giay1.jpg', sizes: [40, 39, 42] },
    { id: '9', name: 'adidas', color: 'red', sex: 'nam', brand: 'ssdsd', promotion: 5, price: 300, image: 'assets/img/product/giay1.jpg', sizes: [40, 39, 42] },
    { id: '10', name: 'adidas1', color: 'blue', sex: 'nam', brand: 'Bitis', promotion: 0, price: 300, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 39] },
    { id: '11', name: 'adidas2', color: 'black', sex: 'nữ', brand: 'Adidas', promotion: 2, price: 1300, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 39] },
    { id: '12', name: 'adidas3', color: 'white', sex: 'nữ', brand: 'Nike', promotion: 3, price: 300, image: 'assets/img/product/giay1.jpg', sizes: [40, 41, 39] },
    { id: '13', name: 'adidas', color: 'gray', sex: 'nam', brand: 'asd', promotion: 5, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 40, 41, 42] },
    { id: '14', name: 'adidas1', color: 'blue', sex: 'nam', brand: 'Bitis', promotion: 0, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 40, 41, 42] },
    { id: '15', name: 'adidas2', color: 'gray', sex: 'nữ', brand: 'dsdsd', promotion: 2, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 40, 41, 42] },
    { id: '16', name: 'adidas3', color: 'white', sex: 'nữ', brand: 'asd', promotion: 3, price: 3000, image: 'assets/img/product/giay1.jpg', sizes: [39, 40, 41, 42] },
  ];
  constructor() { }

  ngOnInit() {
  }

  addProduct() {
    console.log('thêm');
  }

  editProduct(id: string) {
    console.log('sửa' + id);
  }

  detailProduct(id: string) {
    console.log('chi tiết' + id);
  }

  removeProduct(id: string) {
    const index = this.arrProducts.findIndex(e => e.id === id);
    this.arrProducts.splice(index, 1);
  }
}
