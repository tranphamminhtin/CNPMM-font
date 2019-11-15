import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountEmployeeModule } from "./account-employee/account-employee.module";
import { AddEmployeeModule } from "./add-employee/add-employee.module";
import { AddProductModule } from "./add-product/add-product.module";
import { AddRightModule } from "./add-right/add-right.module";
import { CartModule } from "./cart/cart.module";
import { DetailAmountModule } from "./detail-amount/detail-amount.module";
import { DetailOrderModule } from "./detail-order/detail-order.module";
import { DetailOrderAdminModule } from "./detail-order-admin/detail-order-admin.module";
import { DetailProductModule } from "./detail-product/detail-product.module";
import { FixEmployeeModule } from "./fix-employee/fix-employee.module";
import { FixProductModule } from "./fix-product/fix-product.module";
import { FixRightModule } from "./fix-right/fix-right.module";
import { HistoryModule } from "./history/history.module";
import { HomeModule } from "./home/home.module";
import { InformationModule } from "./information/information.module";
import { ListClientModule } from "./list-client/list-client.module";
import { ListEmployeeModule } from "./list-employee/list-employee.module";
import { ListOrderModule } from "./list-order/list-order.module";
import { ListProductModule } from "./list-product/list-product.module";
import { ListRightModule } from "./list-right/list-right.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { SignModule } from "./sign/sign.module";
import { ChangePasswordModule } from "./change-password/change-password.module";

import { AboutComponent } from "./about.component";
import { AccountComponent } from "./account.component";
import { ContactComponent } from "./contact.component";
import { LoginAdminModule } from './login-admin/login-admin.module';

const routesConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'gioi-thieu', component: AboutComponent},
    { path: 'account', component: AccountComponent},
    { path: 'lien-he', component: ContactComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full'}
  ];



@NgModule({
    declarations: [
        AboutComponent,
        AccountComponent,
        ContactComponent
    ],
    imports: [
        AccountEmployeeModule,
        AddEmployeeModule,
        AddProductModule,
        AddRightModule,
        CartModule,
        DetailAmountModule,
        DetailOrderModule,
        DetailOrderAdminModule,
        DetailProductModule,
        FixEmployeeModule,
        FixProductModule,
        FixRightModule,
        HistoryModule,
        HomeModule,
        InformationModule,
        ListClientModule,
        ListEmployeeModule,
        ListOrderModule,
        ListProductModule,
        ListRightModule,
        OrderModule,
        ProductModule,
        SignModule,
        ChangePasswordModule,
        LoginAdminModule,
        RouterModule.forRoot(routesConfig),
        CommonModule
        ],
    exports: [RouterModule]
})

export class AppRoutingModule {}