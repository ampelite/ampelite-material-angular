import { Component, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, Inject, NgModule, Output, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule, Router } from '@angular/router';
import { MatButtonModule, MatIconModule, MatTableDataSource } from '@angular/material';
// import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { ComponentPageTitle } from '../../pages/page-title/page-title';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';
import { map, filter, mergeMap } from 'rxjs/operators';
import { Chart } from 'chart.js';

import { DailypoService, GroupReportService, GroupUnitService } from '../../services';

import { GroupReport as GroupReportModel, GroupUnit as GroupUnitModel } from '../../models';

import { extend } from 'webdriver-js-extender';

// Dialog service
import { DialogService } from './dialogs/dialog.service';

import { SearchDailyDialogComponent } from './dialogs/search-daily-dialog/search-daily-dialog.component'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-po-daily',
  templateUrl: './po-daily.component.html',
  styleUrls: ['./po-daily.component.scss']
})

export class PoDailyComponent implements OnInit, OnDestroy {
  // private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  private isXSmallScreen = matchMedia(Breakpoints.XSmall);
  private isSmallScreen = matchMedia(Breakpoints.Small);
  private isMediumScreen = matchMedia(Breakpoints.Medium);
  private isLargeScreen = matchMedia(Breakpoints.Large);

  public loading = false;
  private groupReportModel: GroupReportModel[] = [];
  private groupUnitModel: GroupUnitModel[] = [];
  private selectedGroupReport: string;
  private selectedGroupUnit: string;
  private selectedDate: Date = new Date();
  private selectedWeek: number;

  private dailyData: any[] = [];

  // Chart 
  private ctx: any;
  private myChart: any;
  private chartHeight: number;
  private label = [];
  private dataSet = [];
  private options: any;
  private titleChart: string;

  // Data table
  private ELEMENT_DATA: Element[];
  private displayedColumns = ['day'];
  private dataSource;

  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dailypoService: DailypoService,
    private _dailypoGroupReportService: GroupReportService,
    private _dailypoGroupUnitService: GroupUnitService,
    private _dialogService: DialogService,
    zone: NgZone,
  ) { }

  openDialog() {
    this._dialogService
      .searching(this.groupReportModel, this.groupUnitModel, this.selectedGroupReport, this.selectedGroupUnit, this.selectedDate, this.selectedWeek)
      .subscribe(res => {
        if (res == undefined) {
          return false;
        }

        this.groupUnitModel = res['groupUnit'];
        this.selectedDate = res['selectedDate'];
        this.selectedGroupReport = res['selectedGroupReport'];
        this.selectedGroupUnit = res['selectedGroupUnit'];
        this.selectedWeek = res["selectedWeek"];

        const unit = this.groupUnitModel.filter(p => { return p.unitCode == this.selectedGroupUnit })
        this.titleChart = `Group ${unit[0].unitTitle}`;

        // get Graph product service
        this._dailypoService
          .getGraphProduct(this.selectedDate.toISOString(), this.selectedGroupReport, this.selectedGroupUnit)
          .subscribe(res => {
            this.dailyData = res.body;
            this.setData();
            this.updateChart();
            this.drawDataTable();

            setTimeout(() => {
              this.loading = true;
            }, 800)

          }, error => console.error(error));
      });
  }

    @ViewChild('barchart') barChart: ElementRef;

  ngOnInit() {

    this._componentPageTitle.title = 'Po. daily report';

    if (this.isXSmallScreen.matches) {
      this.selectedWeek = 7;
      this.barChart.nativeElement.height = 80;
    }

    if (this.isSmallScreen.matches) {
      this.selectedWeek = 14;
      this.barChart.nativeElement.height = 50;
    }

    if (this.isMediumScreen.matches) {
      this.selectedWeek = 21;
      this.barChart.nativeElement.height = 35;
    }

    if (this.isLargeScreen.matches) {
      this.selectedWeek = 31;
      this.barChart.nativeElement.height = 30;
    }

    // get Group report service
    this._dailypoGroupReportService.getAll().subscribe(
      res => {
        this.groupReportModel = res;
        this.selectedGroupReport = this.groupReportModel[0].groupCode;

        // get Group unit service
        this._dailypoGroupUnitService.getByGroupCode(this.selectedGroupReport)
          .subscribe((res) => {
            this.groupUnitModel = res;
            this.selectedDate = new Date();
            this.selectedGroupUnit = this.groupUnitModel[0].unitCode;

            // get Graph product service
            this._dailypoService
              .getGraphProduct(this.selectedDate.toISOString(), this.selectedGroupReport, this.selectedGroupUnit)
              .subscribe(res => {
                this.dailyData = res.body;

                const unit = this.groupUnitModel.filter(p => { return p.unitCode == this.selectedGroupUnit })
                this.titleChart = `Group ${unit[0].unitTitle}`;

                this.setData();
                this.createChart();
                this.drawDataTable();

                setTimeout(() => {
                  this.loading = true;
                }, 800)

              }, error => console.error(error));
          });
      });

  }

  ngAfterViewInit() {
    this.ctx = this.barChart.nativeElement.getContext("2d");
  }

  ngOnDestroy() {
    // this.routeParamSubscription.unsubscribe();
  }

  setData() {
    this.dataSet = [];
    this.label = [];
    this.displayedColumns = ['day'];

    const dateNow = new Date(this.selectedDate);
    const lastDate = new Date(this.selectedDate);
    const lastDays = (this.selectedWeek - 1)
    lastDate.setDate(lastDate.getDate() - lastDays);
    const firstDate = ((lastDate.getMonth() + 1) < (dateNow.getMonth() + 1)) ? 1 : lastDate.getDate();

    for (let i = firstDate; i <= dateNow.getDate(); i++) {
      this.label.push(i);
      this.displayedColumns.push((i - 1).toString());
    }

    let product = this.dailyData.filter(res => { return res.type == "product" });
    let sum = this.dailyData.filter(res => { return res.type == "sum" });
    let avg = this.dailyData.filter(res => { return res.type == "avg" });
    let accu = this.dailyData.filter(res => { return res.type == "accu" });

    avg.map(e => {
      this.dataSet.push({
        label: e.name,
        data: e.unit.slice(firstDate - 1), // -1 เพื่อเปลี่ยนวันที่ให้เป็นตำแหน่ง index
        type: 'line',
        borderWidth: 3,
        // pointStyle: 'rectRot',
        borderColor: "rgb(255, 99, 132)",
        pointBorderColor: "rgba(255, 255, 255, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointHoverBackgroundColor: "rgba(255, 255, 255, 1)",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0)",
      })
    })

    accu.map(e => {
      this.dataSet.push({
        yAxisID: e.type,
        label: e.name,
        data: e.unit.slice(firstDate - 1), // -1 เพื่อเปลี่ยนวันที่ให้เป็นตำแหน่ง index
        type: 'line',
        lineTension: 0,
        borderWidth: 3,
        borderColor: "rgb(255, 202, 40)",
        pointBorderColor: "rgba(255, 255, 255, 1)",
        pointBackgroundColor: "rgba(255, 202, 40, 1)",
        pointHoverBackgroundColor: "rgba(255, 255, 255, 1)",
        pointHoverBorderColor: "rgba(255, 202, 40, 1)",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        backgroundColor: this.gradientFill(),
      });
    })

    product.map((e, i) => {
      this.dataSet.push({
        label: e.name,
        data: e.unit.slice(firstDate - 1), // -1 เพื่อเปลี่ยนวันที่ให้เป็นตำแหน่ง index
        type: 'bar',
        stack: 'stack',
        fillColor: "#79D1CF",
        strokeColor: "#79D1CF",
        backgroundColor: this.colors(i),
        borderWidth: 1
      });
    })

  }

  colors(i: number) {
    let color = ['#C5CAE9', '#F8BBD0', '#E57373', '#BBDEFB', '#80CBC4', '#CCFF90', '#FFD180'];
    return color[i];
  }

  gradientFill() {
    let gradientFill = this.ctx.createLinearGradient(0, 0, 0, 600);
    gradientFill.addColorStop(0, "rgba(255, 202, 40, 0.4)");
    gradientFill.addColorStop(1, "rgba(197, 32, 186, 0.4)");
    return gradientFill;
  }

  createChart() {
    const options = {
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              color: "#fff",
              drawOnChartArea: false,
            },
            ticks: {
              fontColor: "#fff"
            }
          }
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              drawTicks: true,
              zeroLineColor: "#fff"
            },
            ticks: {
              fontColor: "#fff",
              padding: 5
            }
          }
          , {
            id: 'accu',
            position: 'right',
            gridLines: {
              color: "#fff",
              drawOnChartArea: false,
            },
            ticks: {
              fontColor: "#fff",
              padding: 5
            }
          }
        ]
      },
      animation: {
        onComplete: function () {
          let chartInstance = this.chart,
            ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = 'rgba(0, 0, 0, 0.87)';
        }
      },
      legend: {
        display: true,
        fontColor: "#fff",
        labels: {
          fontColor: "#fff",
          usePointStyle: true
        }
        // position: 'bottom',
      },
      title: {
        display: true,
        text: this.titleChart,
        fontColor: "#fff",
        fontFamily: "Roboto",
        fontSize: 14
      },
      tooltips: {
        mode: 'x',
        intersect: true
      },
    };

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        datasets: this.dataSet,
        labels: this.label
      },
      options: options,
    });

  }

  updateChart() {
    this.myChart.data.datasets = this.dataSet;
    this.myChart.data.labels = this.label;
    this.myChart.options.title.text = this.titleChart;
    this.myChart.update();
  }

  drawDataTable() {
    this.ELEMENT_DATA = this.dailyData.map(item => {
      return {
        day: item.name, type: item.type, ...item.unit
      };
    });

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

}

export interface Element {
  day: string;
  type: string;  
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  15: string;
  16: string;
  17: string;
  18: string;
  19: string;
  20: string;
  21: string;
  22: string;
  23: string;
  24: string;
  25: string;
  26: string;
  27: string;
  28: string;
  29: string;
  30: string;
}






