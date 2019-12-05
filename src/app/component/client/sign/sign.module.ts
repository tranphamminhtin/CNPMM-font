import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SignComponent } from './sign.component';
import { FormsModule } from "@angular/forms";

const routesConfig: Routes = [
    { path: 'dang-nhap-dang-ky', component: SignComponent},
    { path: 'dang-nhap', redirectTo: 'dang-nhap-dang-ky', pathMatch: 'full' },
    { path: 'dang-ky', redirectTo: 'dang-nhap-dang-ky', pathMatch: 'full'}
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [SignComponent]
})

export class SignModule {}