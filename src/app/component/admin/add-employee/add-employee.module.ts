import { NgModule } from "@angular/core";
import { AddEmployeeComponent } from './add-employee.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AuthEmployeeGuard } from "../../../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/them-nhan-vien', component: AddEmployeeComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [AddEmployeeComponent]
})

export class AddEmployeeModule {}