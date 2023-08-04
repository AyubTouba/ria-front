import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LogRequestService } from 'app/@core/services/api/logrequest.service';

@Component({
  selector: 'ngx-chart-request-404-client',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class ChartRequestFortyFourClientComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService,private logRequestService: LogRequestService) {
  }

  ngAfterViewInit() {
    this.logRequestService.getWebclientCount({'final_status':'404'}).subscribe(dataApi => {

      dataApi = dataApi.map((data:any) =>({value:data.sum,name:data.name}))

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.dangerLight],
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
            data:  dataApi.map(dt => dt.name),
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
            type: 'value',
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
        series: [
          {
            name: 'Failed requests',
            type: 'bar',
            barWidth: '60%',
            data: dataApi.map(dt => dt.value),
          },
        ],
      };
    });
  })

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
