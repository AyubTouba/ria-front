import {  Input,AfterViewInit, Component, OnDestroy,OnChanges,SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { OptionConfig } from './option-config';

@Component({
  selector: 'wbt-bar-chart',
  template: ` 
    <div  style="height:270px;" echarts [options]="options" class="echart"></div>
  `,
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  options: any = {};
  themeSubscription: any;
  @Input() data:any;
  @Input() optionConfig:any;
  @Input() mapData:boolean;
  colors:any = {};
  echarts:any = {};
  isMaped: boolean;
  constructor(private theme: NbThemeService) {
    if(this.mapData) 
    this.data = this.data.map((data:any) =>({value:data.data,name:data._id}));
  }

 
  ngOnChanges(changes: SimpleChanges) {
    
    this.data = changes.data.currentValue;
    this.setOptions();
   
  }
  ngAfterViewInit() {
   
   // if(this.mapData) 
     // this.data = this.data.map((data:any) =>({value:data.data,name:data._id}));


    this.setOptions();

  }
  
  setOptions() {

    if(this.mapData && !this.isMaped) {
      this.data = this.data.map((data:any) =>({value:data.data,name:data._id}));
      this.isMaped = true;
    }
    
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
     
      this.colors = config.variables;
      this.echarts= config.variables.echarts;
    this.options = {
      backgroundColor: this.echarts.bg,
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
          data:  this.data.map(dt => dt.name),
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
          name: this.optionConfig['series.name'],
          type: 'bar',
          barWidth: '60%',
          data: this.data.map(dt => dt.value),
        },
      ],
    };
  });

  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
