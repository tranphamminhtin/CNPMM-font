import { NgModule } from "@angular/core";
import { DetailOrderComponent } from './detail-order.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { AuthClientGuard } from "../_guard/auth-client.guard";

const routesConfig: Routes = [
    { path: 'chi-tiet-don-hang/:id', component: DetailOrderComponent, canActivate: [AuthClientGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [DetailOrderComponent]
})

export class DetailOrderModule {}