import { NgModule } from "@angular/core";
import { AddProductComponent } from './add-product.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AuthEmployeeGuard } from "../../../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/them-san-pham', component: AddProductComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [AddProductComponent]
})

export class AddProductModule {}