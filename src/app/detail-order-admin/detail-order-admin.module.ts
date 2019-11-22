import { NgModule } from "@angular/core";
import { DetailOrderAdminComponent } from './detail-order-admin.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { AuthEmployeeGuard } from "../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/chi-tiet-don-hang-ad/:id', component: DetailOrderAdminComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [DetailOrderAdminComponent]
})

export class DetailOrderAdminModule {}