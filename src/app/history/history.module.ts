import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { HistoryComponent } from './history.component';

const routesConfig: Routes = [
    { path: 'lich-su/:id', component: HistoryComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routesConfig)
    ],
    declarations: [HistoryComponent]
})

export class HistoryModule {}