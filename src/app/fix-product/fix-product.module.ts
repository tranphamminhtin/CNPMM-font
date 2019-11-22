import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FixProductComponent } from './fix-product.component';
import { FormsModule } from '@angular/forms';
import { AuthEmployeeGuard } from "../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/sua-san-pham/:id', component: FixProductComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [FixProductComponent]
})

export class FixProductModule {}