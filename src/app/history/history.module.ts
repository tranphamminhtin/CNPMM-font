import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { HistoryComponent } from './history.component';
import { AuthClientGuard } from "../_guard/auth-client.guard";

const routesConfig: Routes = [
    { path: 'lich-su', component: HistoryComponent, canActivate: [AuthClientGuard]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [HistoryComponent]
})

export class HistoryModule {}