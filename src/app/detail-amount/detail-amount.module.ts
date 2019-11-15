import { NgModule } from "@angular/core";
import { DetailAmountComponent } from './detail-amount.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

const routesConfig: Routes = [
    { path: 'admin/chi-tiet-san-pham/:id', component: DetailAmountComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [DetailAmountComponent]
})

export class DetailAmountModule {}