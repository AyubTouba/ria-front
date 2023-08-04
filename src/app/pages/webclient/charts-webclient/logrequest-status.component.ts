import {  Input,AfterViewInit, Component, OnDestroy,OnChanges,SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-logrequest-status',
  template: ` 
    <div style="height:270px;" echarts [options]="options" class="echart"></div>
  `,
})
export class LogRequestStatusComponent implements AfterViewInit, OnDestroy, OnChanges {
  options: any = {};
  themeSubscription: any;
  @Input() logRequests:any;
  @Input() labelConfig:any;
  colors:any;
  echarts:any;
  constructor(private theme: NbThemeService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.logRequests = changes.logRequests.currentValue;
    this.setOptions();
   
  }
  ngAfterViewInit() {
   
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      this.echarts= config.variables.echarts;
      this.setOptions();
      
    });


  }
  
  setOptions() {
    this.options = {
      backgroundColor: echarts.bg,
      color: [this.colors.infoLight],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data:  this.logRequests.map(dt => dt.name),
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: this.echarts.axisLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: this.echarts.textColor,
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: this.echarts.axisLineColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: this.echarts.splitLineColor,
            },
          },
          axisLabel: {
            textStyle: {
              color: this.echarts.textColor,
            },
          },
        },
      ],
      series: [
        {
          name: 'Requests',
          type: 'bar',
          barWidth: '60%',
          data: this.logRequests.map(dt => dt.value),
        },
      ],
    };
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
