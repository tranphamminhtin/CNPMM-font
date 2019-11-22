import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { LoginAdminComponent } from './login-admin.component';
import { FormsModule } from "@angular/forms";

const routesConfig: Routes = [
    { path: 'login', component: LoginAdminComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [LoginAdminComponent]
})

export class LoginAdminModule {}