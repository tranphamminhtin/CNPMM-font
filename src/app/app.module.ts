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

import { AuthClientGuard } from "./_guard/auth-client.guard";
import { AuthEmployeeGuard } from "./_guard/auth-employee.guard";

import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("24771927671-a9iuj1tcou09qfvfbcun2galj6dda2no.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("588780971872866")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderAdminComponent
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
    ToastrModule.forRoot({ timeOut: 1500 }), // ToastrModule added
    SocialLoginModule,
    AppRoutingModule
  ],
  providers: [
    AuthClientGuard,
    AuthEmployeeGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
