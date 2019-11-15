import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FixRightComponent } from './fix-right.component';
import { FormsModule } from '@angular/forms';

const routesConfig: Routes = [
    { path: 'admin/sua-quyen/:id', component: FixRightComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [FixRightComponent]
})

export class FixRightModule {}