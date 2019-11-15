import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ListRightComponent } from './list-right.component';

const routesConfig: Routes = [
    { path: 'admin/ql-quyen', component: ListRightComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ListRightComponent]
})

export class ListRightModule {}