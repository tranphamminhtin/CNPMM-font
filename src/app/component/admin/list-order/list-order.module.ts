import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ListOrderComponent } from './list-order.component';
import { AuthEmployeeGuard } from "../../../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/ql-don-hang', component: ListOrderComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ListOrderComponent]
})

export class ListOrderModule {}