import { NgModule } from "@angular/core";
import { FixEmployeeComponent } from './fix-employee.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AuthEmployeeGuard } from "../../../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/sua-nhan-vien/:id', component: FixEmployeeComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [FixEmployeeComponent]
})

export class FixEmployeeModule {}