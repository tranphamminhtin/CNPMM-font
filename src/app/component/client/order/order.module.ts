import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { OrderComponent } from './order.component';
import { FormsModule } from "@angular/forms";

const routesConfig: Routes = [
    { path: 'dat-hang', component: OrderComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [OrderComponent]
})

export class OrderModule {}