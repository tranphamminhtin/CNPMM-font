import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ListEmployeeComponent } from './list-employee.component';

const routesConfig: Routes = [
    { path: 'admin/ql-nhan-vien', component: ListEmployeeComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ListEmployeeComponent]
})

export class ListEmployeeModule {}