import { NgModule } from "@angular/core";
import { ChangePasswordComponent } from './change-password.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from "@angular/forms";

const routesConfig: Routes = [
    { path: 'doi-mk', component: ChangePasswordComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ChangePasswordComponent]
})

export class ChangePasswordModule {}