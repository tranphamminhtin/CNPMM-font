import { NgModule } from "@angular/core";
import { AddProductComponent } from './add-product.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

const routesConfig: Routes = [
    { path: 'admin/them-san-pham', component: AddProductComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [AddProductComponent]
})

export class AddProductModule {}