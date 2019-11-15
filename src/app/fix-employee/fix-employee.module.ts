import { NgModule } from "@angular/core";
import { FixEmployeeComponent } from './fix-employee.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

const routesConfig: Routes = [
    { path: 'admin/sua-nhan-vien/:id', component: FixEmployeeComponent}
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