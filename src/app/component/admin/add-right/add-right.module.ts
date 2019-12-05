import { NgModule } from "@angular/core";
import { AddRightComponent } from './add-right.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AuthEmployeeGuard } from "../../../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/them-quyen', component: AddRightComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [AddRightComponent]
})

export class AddRightModule {}