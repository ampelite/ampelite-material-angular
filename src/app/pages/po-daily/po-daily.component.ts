import { Component, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, Inject, NgModule, Output, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButtonModule, MatIconModule, MatTableDataSource, MatOption, MatDatepickerInputEvent } from '@angular/material';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
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
  private selectedDate: Date;

  private dailyData: any[] = [];

  // Chart 
  private ctx: any;
  private myChart: any;
  private chartHeight: number;
  private label = [];
  private dataSet = [];
  private options: any;
  private titleChart: string;
  // private date = (new Date()).toISOString();
  // private groupCode: string;
  // private unit: string;
  private lastDays: number = 31;

  // Data table
  private ELEMENT_DATA: Element[];
  private displayedColumns = ['day'];
  private dataSource;

  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private _route: ActivatedRoute,
    private _dailypoService: DailypoService,
    private _dailypoGroupReportService: GroupReportService,
    private _dailypoGroupUnitService: GroupUnitService,
    private _dialogService: DialogService,
    zone: NgZone,
    // private breakpointObserver: BreakpointObserver
  ) {
    // this.isXSmallScreen.addListener(mql => zone.run(() => this.isXSmallScreen = mql));
    // this.isSmallScreen.addListener(mql => zone.run(() => this.isXSmallScreen = mql));
    // this.isMediumScreen.addListener(mql => zone.run(() => this.isXSmallScreen = mql));
  }

  openDialog() {
    this._dialogService
      .searching(this.groupReportModel, this.groupUnitModel, 'fibre', '1m', new Date())
      .subscribe(res => {
        this.selectedDate = res['selectedDate'].toISOString();
        this.selectedGroupReport = res['selectedGroupReport'];
        this.selectedGroupUnit = res['selectedGroupUnit'];
        this.titleChart = 'Group ${}';
      });
  }

  @ViewChild('barchart') barChart: ElementRef;

  ngOnInit() {

    this._componentPageTitle.title = 'Po. daily report';

    if (this.isXSmallScreen.matches) {
      this.lastDays = 6;
      this.barChart.nativeElement.height = 80;
    }

    if (this.isSmallScreen.matches) {
      this.lastDays = 13;
      this.barChart.nativeElement.height = 50;
    }

    if (this.isMediumScreen.matches) {
      this.lastDays = 31;
      this.barChart.nativeElement.height = 35;
    }

    if (this.isLargeScreen.matches) {
      this.lastDays = 31;
      this.barChart.nativeElement.height = 30;
    }

    // get Group report service
    this._dailypoGroupReportService.getAll().subscribe(
      res => {
        this.groupReportModel = res;
        this.selectedGroupReport = this.groupReportModel[0].groupCode;

        // get Group unit service
        this._dailypoGroupUnitService.getByGroupCode(this.selectedGroupReport)
          .subscribe(res => {
            this.groupUnitModel = res;
            this.selectedDate = new Date();
            this.selectedGroupUnit = this.groupUnitModel[0].unitCode;

            // get Graph product service
            this._dailypoService.getGraphProduct(this.selectedDate.toISOString(), this.selectedGroupReport, this.selectedGroupUnit)
              .subscribe(res => {
                this.dailyData = res.body;
                // if (this.isScreenSmall()) {
                // this.lastDays = 7;
                // }
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

    let dateNow = this.selectedDate;
    let lastDate = this.selectedDate;
    lastDate.setDate(lastDate.getDate() - this.lastDays);
    let firstDate = ((lastDate.getMonth() + 1) < (dateNow.getMonth() + 1)) ? 1 : lastDate.getDate();

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
        pointStyle: 'rectRot',
        borderColor: "rgb(255, 99, 132)",
        pointBorderColor: "rgba(255, 99, 132, 0.6)",
        pointBackgroundColor: "rgba(255, 255, 255, 0.6)",
        pointHoverBackgroundColor: "rgba(255, 99, 132, 0.6)",
        pointHoverBorderColor: "rgba(255, 99, 132, 0.6)",
        pointBorderWidth: 8,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 1,
        pointRadius: 3,
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
        pointBorderColor: "rgba(255, 202, 40, 0.6)",
        pointBackgroundColor: "rgba(255, 255, 255, 0.6)",
        pointHoverBackgroundColor: "rgba(255, 202, 40, 0.6)",
        pointHoverBorderColor: "rgba(255, 202, 40, 0.6)",
        pointBorderWidth: 8,
        pointHoverRadius: 8,
        pointHoverBorderWidth: 1,
        pointRadius: 3,
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
    let gradientFill = this.ctx.createLinearGradient(0, 0, 0, 500);
    gradientFill.addColorStop(0, "rgba(255, 202, 40, 0.6)");
    gradientFill.addColorStop(1, "rgba(255, 202, 250, 0)");
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
              // drawOnChartArea: false,              
              // color: white,
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
          fontColor: "#fff"
        }
        // position: 'bottom',
      },
      title: {
        display: true,
        text: 'Custom Chart Title',
        fontColor: "#fff",
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
    this.myChart.update();
  }

  drawDataTable() {
    this.ELEMENT_DATA = this.dailyData.map(item => {
      return { day: item.name, ...item.unit };
    });
    console.log(this.ELEMENT_DATA)
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

}

export interface Element {
  day: string;
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  16: number;
  17: number;
  18: number;
  19: number;
  20: number;
  21: number;
  22: number;
  23: number;
  24: number;
  25: number;
  26: number;
  27: number;
  28: number;
  29: number;
  30: number;
}






