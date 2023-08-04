import { AfterViewInit, Component, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges,  } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { SubSink } from 'subsink';

@Component({
  selector: 'wbt-chartline',
  template: `
    <div echarts [options]="options" class="echart" (chartClick)="onLineClick($event)"></div>
  `,
})
export class ChartlineComponent implements AfterViewInit,OnChanges,OnDestroy {
  options: any = {};
  @Input() dataInput; 
  @Output() dataLine = new EventEmitter<any>();

  private subs = new SubSink();

  constructor(private theme: NbThemeService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataInput = changes.dataInput.currentValue;
    this.setOptions();
   
  }
  onLineClick(event) {
    this.dataLine.emit({date:event.name,index:event.dataIndex});
  }
  ngAfterViewInit() {
    this.setOptions();
  }
 
  setOptions(){
    this.subs.sink = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      let data = this.dataInput.data;
      let labels = this.dataInput.labels;
      let label = this.dataInput.label;
      let color = this.dataInput.color ? this.dataInput.color : colors.danger;
      this.options = {
        backgroundColor: echarts.bg,
        color: [color, colors.primary, colors.info],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: ['Errors'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data:labels,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'log',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            name: label,
            type: 'line',
            data: data,
          },],
      };
    });
  }
 
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
