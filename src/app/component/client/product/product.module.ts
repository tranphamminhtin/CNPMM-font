import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ProductComponent } from './product.component';
import { FormsModule } from "@angular/forms";

const routesConfig: Routes = [
    { path: 'san-pham', component: ProductComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [ProductComponent]
})

export class ProductModule {}