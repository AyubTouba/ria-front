import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LogRequestService } from 'app/@core/services/api/logrequest.service';

@Component({
  selector: 'ngx-charts-requestclient',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class ChartRequestsClientPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService,private logRequestService: LogRequestService) {
  }

  ngAfterViewInit() {
    this.logRequestService.getWebclientCount().subscribe(dataApi => {

    dataApi = dataApi.map((data:any) =>({value:data.sum,name:data.name}))
    
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: dataApi.map(dt => dt.name),
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'WebApplication',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: dataApi,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
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
