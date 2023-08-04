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
  NbRadioModule,
  NbActionsModule,
  NbCheckboxModule,
  NbInputModule,
  NbFormFieldModule,
  NbAlertModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routedComponents, WebClientRoutingModule } from './webclient-routing.module';
import { DataWebClientComponent } from './data-webclient/data-webclient.component';
import { LogRequestStatusComponent } from './charts-webclient/logrequest-status.component';
import { SharedModule } from 'app/shared/shared.module';
import { ListLogrequestComponent } from './list-logrequest/list-logrequest.component';
import { TransformDataDatePipe } from './pipes/transfrom-data-chart.pipe';

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
    Ng2SmartTableModule,
    WebClientRoutingModule,
    NbCardModule,
    NbActionsModule,
    NbInputModule,
    NbFormFieldModule,
    SharedModule,
    NbAlertModule
  ],
  declarations: [
    ...routedComponents,
    DataWebClientComponent,
    LogRequestStatusComponent,
    ListLogrequestComponent,
    TransformDataDatePipe
  ],
  entryComponents: [
    ListLogrequestComponent
  ],
  
  providers: [
  ],
})
export class WebClientModule { }
