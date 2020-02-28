import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { WebSocketService } from '../../../@core/utils';

@Component({
  selector: 'ngx-chartjs-radar',
  template: `
    <chart type="radar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsRadarComponent implements OnDestroy {
  options: any;
  data: {};
  themeSubscription: any;

  constructor(private theme: NbThemeService,private webSocketService:WebSocketService) {
    this.webSocketService.getRadarChart();
    this.getRadarChartDataFromSocket();
  }

  radarChartData1:Array<any>=[];
  radarChartData2:Array<any>=[];

  getRadarChartDataFromSocket(){
    this.webSocketService.radarChart$.subscribe((data:any)=>{
      this.radarChartData1=data.data.seriesA;
      this.radarChartData2=data.data.seriesB;
      console.log(data);
      this.drawRadarchart();
    })
  }

  drawRadarchart(){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{
          data: this.radarChartData1,
          label: 'Series A',
          borderColor: colors.danger,
          backgroundColor: NbColorHelper.hexToRgbA(colors.dangerLight, 0.5),
        }, {
          data: this.radarChartData2,
          label: 'Series B',
          borderColor: colors.warning,
          backgroundColor: NbColorHelper.hexToRgbA(colors.warningLight, 0.5),
        }],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scaleFontColor: 'white',
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scale: {
          pointLabels: {
            fontSize: 14,
            fontColor: chartjs.textColor,
          },
          gridLines: {
            color: chartjs.axisLineColor,
          },
          angleLines: {
            color: chartjs.axisLineColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
