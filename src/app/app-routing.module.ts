import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountEmployeeModule } from "./component/admin/account-employee/account-employee.module";
import { AddEmployeeModule } from "./component/admin/add-employee/add-employee.module";
import { AddProductModule } from "./component/admin/add-product/add-product.module";
import { AddRightModule } from "./component/admin/add-right/add-right.module";
import { CartModule } from "./component/client/cart/cart.module";
import { DetailAmountModule } from "./component/admin/detail-amount/detail-amount.module";
import { DetailOrderModule } from "./component/client/detail-order/detail-order.module";
import { DetailOrderAdminModule } from "./component/admin/detail-order-admin/detail-order-admin.module";
import { DetailProductModule } from "./component/client/detail-product/detail-product.module";
import { FixEmployeeModule } from "./component/admin/fix-employee/fix-employee.module";
import { FixProductModule } from "./component/admin/fix-product/fix-product.module";
import { FixRightModule } from "./component/admin/fix-right/fix-right.module";
import { HistoryModule } from "./component/client/history/history.module";
import { HomeModule } from "./component/client/home/home.module";
import { InformationModule } from "./component/client/information/information.module";
import { ListClientModule } from "./component/admin/list-client/list-client.module";
import { ListEmployeeModule } from "./component/admin/list-employee/list-employee.module";
import { ListOrderModule } from "./component/admin/list-order/list-order.module";
import { ListProductModule } from "./component/admin/list-product/list-product.module";
import { ListRightModule } from "./component/admin/list-right/list-right.module";
import { OrderModule } from "./component/client/order/order.module";
import { ProductModule } from "./component/client/product/product.module";
import { SignModule } from "./component/client/sign/sign.module";
import { ChangePasswordModule } from "./component/client/change-password/change-password.module";

import { AboutComponent } from "./component/client/about.component";
import { AccountComponent } from "./component/client/account.component";
import { ContactComponent } from "./component/client/contact.component";
import { LoginAdminModule } from './component/admin/login-admin/login-admin.module';

import { AuthClientGuard } from "./_guard/auth-client.guard";

const routesConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'gioi-thieu', component: AboutComponent},
    { path: 'account', component: AccountComponent, canActivate: [AuthClientGuard]},
    { path: 'lien-he', component: ContactComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full'}
  ];



@NgModule({
    declarations: [
        AboutComponent,
        AccountComponent,
        ContactComponent,
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