import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';

import { HomeComponent } from './home.component';
import { WebclientsListComponent } from './webclients-list/webclients-list.component';

import { ChartRequestFortyFourClientComponent } from './charts-webclients/chart-request-fortyfour-client.component';
import { ChartRequestsClientPieComponent } from './charts-webclients/chart-requests-client-pie.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    HomeComponent,
    WebclientsListComponent,
    ChartRequestFortyFourClientComponent,
    ChartRequestsClientPieComponent,
  ],
  providers: [
  ],
})
export class HomeModule { }
