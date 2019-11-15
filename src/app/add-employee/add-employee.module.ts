import { NgModule } from "@angular/core";
import { AddEmployeeComponent } from './add-employee.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

const routesConfig: Routes = [
    { path: 'admin/them-nhan-vien', component: AddEmployeeComponent}
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