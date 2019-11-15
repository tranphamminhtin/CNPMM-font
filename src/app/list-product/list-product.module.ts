import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ListProductComponent } from './list-product.component';

const routesConfig: Routes = [
    { path: 'admin/ql-san-pham', component: ListProductComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ListProductComponent]
})

export class ListProductModule {}