import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { WebSocketService } from '../../../@core/utils';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,private webSocketService:WebSocketService) {
    this.webSocketService.getPieChart();
    this.getPieChartDataFromSocket();
  }

   pieChartData:Array<any>=[];

  getPieChartDataFromSocket(){
    this.webSocketService.pieChart$.subscribe((data:any)=>{
      this.pieChartData=data.data;
      this.drawPieChart();
    })
  }

   drawPieChart(){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
        datasets: [{
          data: this.pieChartData,
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
        }],
      };


      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
   }


  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
