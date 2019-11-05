import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { AboutComponent } from './about.component';
import { SignComponent } from './sign/sign.component';
import { AccountComponent } from './account.component';
import { ChangePasswordComponent } from './change-password.component';
import { OrderComponent } from './order/order.component';
import { InformationComponent } from './information/information.component';
import { ProductComponent } from './product/product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { HeaderAdminComponent } from './header-admin.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginAdminComponent } from './login-admin.component';
import { HistoryComponent } from './history/history.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { AddRightComponent } from './add-right/add-right.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DetailAmountComponent } from './detail-amount/detail-amount.component';
import { FixRightComponent } from './fix-right/fix-right.component';
import { FixEmployeeComponent } from './fix-employee/fix-employee.component';
import { ListRightComponent } from './list-right/list-right.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { ListProductComponent } from './list-product/list-product.component';
import { FixProductComponent } from './fix-product/fix-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailOrderAdminComponent } from './detail-order-admin/detail-order-admin.component';
import { AccountEmployeeComponent } from './account-employee/account-employee.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SignComponent,
    AccountComponent,
    ChangePasswordComponent,
    OrderComponent,
    InformationComponent,
    ProductComponent,
    DetailProductComponent,
    HeaderAdminComponent,
    HomeComponent,
    CartComponent,
    LoginAdminComponent,
    HistoryComponent,
    DetailOrderComponent,
    AddRightComponent,
    AddEmployeeComponent,
    DetailAmountComponent,
    FixRightComponent,
    FixEmployeeComponent,
    ListRightComponent,
    ListOrderComponent,
    ListClientComponent,
    ListEmployeeComponent,
    ListProductComponent,
    FixProductComponent,
    AddProductComponent,
    DetailOrderAdminComponent,
    AccountEmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
