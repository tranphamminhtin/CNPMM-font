import { NgModule } from "@angular/core";
import { CartComponent } from './cart.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from "@angular/forms";

const routesConfig: Routes = [
    { path: 'gio-hang', component: CartComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [CartComponent]
})

export class CartModule {}