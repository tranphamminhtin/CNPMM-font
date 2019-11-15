import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ListClientComponent } from './list-client.component';
import {  } from "../header-admin.component";

const routesConfig: Routes = [
    { path: 'admin/ql-khach-hang', component: ListClientComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ListClientComponent ]
})

export class ListClientModule {}