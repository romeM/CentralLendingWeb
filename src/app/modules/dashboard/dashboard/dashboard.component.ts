import { Component, OnInit } from '@angular/core';
import { PersonMonthlyStatisticsService } from '../../core/services';
import { PersonMonthlyStatistics } from '../../core/models';

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
  private personMonthlyStatistics:Array<PersonMonthlyStatistics>;
  private lineChartLabels:Array<string> = [];
  private ipmtMonthlyStatistics:Array<number>;
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  constructor(private personMonthlyStatisticsService: PersonMonthlyStatisticsService) { }

  ngOnInit() {
    this.personMonthlyStatisticsService.get().then(personMonthlyStatistics => 
      { 
        this.personMonthlyStatistics = personMonthlyStatistics; 
        let lineChartLabelsMonths = this.personMonthlyStatisticsService.getDateFromPersonMonthlyStatistics(this.personMonthlyStatistics);
        this.lineChartLabels.length = 0;
          for (let i = 0; i < lineChartLabelsMonths.length; i++) {
            this.lineChartLabels.push(lineChartLabelsMonths[i]);
          }

        this.lineChartData = [
          {data: this.personMonthlyStatisticsService.getIPMTFromPersonMonthlyStatistics(this.personMonthlyStatistics), label: 'IPMT'},
          {data: this.personMonthlyStatisticsService.getPMTFromPersonMonthlyStatistics(this.personMonthlyStatistics), label: 'PMT'},
          {data: this.personMonthlyStatisticsService.getPPMTFromPersonMonthlyStatistics(this.personMonthlyStatistics), label: 'PPMT'}
        ];
      });
  }
}
