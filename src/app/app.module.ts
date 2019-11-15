import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { HeaderAdminComponent } from './header-admin.component';
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // AboutComponent,
    // SignComponent,
    // AccountComponent,
    // ChangePasswordComponent,
    // OrderComponent,
    // InformationComponent,
    // ProductComponent,
    // DetailProductComponent,
    HeaderAdminComponent
    // HomeComponent,
    // CartComponent,
    // LoginAdminComponent,
    // HistoryComponent,
    // DetailOrderComponent,
    // AddRightComponent,
    // AddEmployeeComponent,
    // DetailAmountComponent,
    // FixRightComponent,
    // FixEmployeeComponent,
    // ListRightComponent,
    // ListOrderComponent,
    // ListClientComponent,
    // ListEmployeeComponent,
    // ListProductComponent,
    // FixProductComponent,
    // AddProductComponent,
    // DetailOrderAdminComponent,
    // AccountEmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
