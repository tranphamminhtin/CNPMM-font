import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { InformationComponent } from './information.component';
import { FormsModule } from "@angular/forms";
import { AuthClientGuard } from "../../../_guard/auth-client.guard";

const routesConfig: Routes = [
    { path: 'thong-tin', component: InformationComponent, canActivate: [AuthClientGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [InformationComponent]
})

export class InformationModule {}