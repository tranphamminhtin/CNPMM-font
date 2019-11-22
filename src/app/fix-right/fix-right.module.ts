import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FixRightComponent } from './fix-right.component';
import { FormsModule } from '@angular/forms';
import { AuthEmployeeGuard } from "../_guard/auth-employee.guard";

const routesConfig: Routes = [
    { path: 'admin/sua-quyen/:id', component: FixRightComponent, canActivate: [AuthEmployeeGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [FixRightComponent]
})

export class FixRightModule {}