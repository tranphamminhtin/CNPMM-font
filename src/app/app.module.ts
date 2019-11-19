import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBjk2mGc_3yB4R0PVeRTOBsOpfwmdN5kcc",
      authDomain: "upload-image-with-angular.firebaseapp.com",
      projectId: "upload-image-with-angular",
      storageBucket: "upload-image-with-angular.appspot.com",
    }),
    AngularFireStorageModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({timeOut: 1500}), // ToastrModule added
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
