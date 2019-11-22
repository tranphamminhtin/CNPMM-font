import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ListRightComponent } from './list-right.component';
import { AuthEmployeeGuard } from "../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/ql-quyen', component: ListRightComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ListRightComponent]
})

export class ListRightModule {}