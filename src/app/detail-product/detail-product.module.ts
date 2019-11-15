import { NgModule } from "@angular/core";
import { DetailProductComponent } from './detail-product.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

const routesConfig: Routes = [
    { path: 'san-pham/:id', component: DetailProductComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [DetailProductComponent]
})

export class DetailProductModule {}