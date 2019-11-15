import { NgModule } from "@angular/core";
import { AddRightComponent } from './add-right.component'
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';

const routesConfig: Routes = [
    { path: 'admin/them-quyen', component: AddRightComponent}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [AddRightComponent]
})

export class AddRightModule {}