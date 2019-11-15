import { NgModule } from "@angular/core";
import { AccountEmployeeComponent } from './account-employee.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

const routesConfig: Routes = [
    { path: 'admin/home', component: AccountEmployeeComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [AccountEmployeeComponent]
})

export class AccountEmployeeModule {}