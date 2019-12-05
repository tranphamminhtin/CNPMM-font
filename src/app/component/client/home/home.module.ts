import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component';

const routesConfig: Routes = [
    { path: 'home', component: HomeComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [HomeComponent]
})

export class HomeModule {}