import { Component, OnInit } from '@angular/core';
import { UserMonthlyStatisticsService } from '../../core/services';
import { UserMonthlyStatistics } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public lineChartData:Array<any> = [
    {data: [], label: 'IPMT'},
    {data: [], label: 'PMT'},
    {data: [], label: 'PPMT'}
  ];

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  private userMonthlyStatistics:Array<UserMonthlyStatistics>;
  private lineChartLabels:Array<string> = [];
  private ipmtMonthlyStatistics:Array<number>;
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  constructor(private userMonthlyStatisticsService: UserMonthlyStatisticsService) { }

  ngOnInit() {
    this.userMonthlyStatisticsService.get().then(userMonthlyStatistics => 
      { 
        this.userMonthlyStatistics = userMonthlyStatistics; 
        let lineChartLabelsMonths = this.userMonthlyStatisticsService.getDateFromUserMonthlyStatistics(this.userMonthlyStatistics);
        this.lineChartLabels.length = 0;
          for (let i = lineChartLabelsMonths.length - 1; i >= 0; i--) {
            this.lineChartLabels.push(lineChartLabelsMonths[i]);
          }

        this.lineChartData = [
          {data: this.userMonthlyStatisticsService.getIPMTFromUserMonthlyStatistics(this.userMonthlyStatistics), label: 'IPMT'},
          {data: this.userMonthlyStatisticsService.getPMTFromUserMonthlyStatistics(this.userMonthlyStatistics), label: 'PMT'},
          {data: this.userMonthlyStatisticsService.getPPMTFromUserMonthlyStatistics(this.userMonthlyStatistics), label: 'PPMT'}
        ];
      });
  }
}
