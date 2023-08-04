import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AnalyticsChartComponent } from './components/chart-analytics/visitors-analytics-chart.component';
import { ChartlineComponent } from './components/chartline/chartline.component';
import { ChartModule } from 'angular2-chartjs';


@NgModule({
  declarations: [
    BarChartComponent,
    AnalyticsChartComponent,
    ChartlineComponent,
    
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  exports: [
    BarChartComponent,
    AnalyticsChartComponent,
    ChartlineComponent
  ]
})
export class SharedModule { }
