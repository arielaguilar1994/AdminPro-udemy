import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

//ng2-Charts (graficos)
import { ChartsModule } from 'ng2-charts';

import { APP_ROUTING_PAGE } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaComponent } from '../components/grafica/grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaComponent,
        AccountSettingsComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaComponent,
        AccountSettingsComponent
    ],
    imports: [
        SharedModule,
        APP_ROUTING_PAGE,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule {}