import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ListOrderComponent } from './list-order.component';

const routesConfig: Routes = [
    { path: 'admin/ql-don-hang', component: ListOrderComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ListOrderComponent]
})

export class ListOrderModule {}