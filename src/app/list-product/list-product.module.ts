import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ListProductComponent } from './list-product.component';
import { AuthEmployeeGuard } from "../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/ql-san-pham', component: ListProductComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ListProductComponent]
})

export class ListProductModule {}