import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FixProductComponent } from './fix-product.component';
import { FormsModule } from '@angular/forms';

const routesConfig: Routes = [
    { path: 'admin/sua-san-pham/:id', component: FixProductComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [FixProductComponent]
})

export class FixProductModule {}