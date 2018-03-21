import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Inject,
  NgModule,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatButtonModule,
  MatIconModule,
  MatTableDataSource,
  MatOption,
  MatDatepickerInputEvent
} from '@angular/material';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { ComponentPageTitle } from '../../pages/page-title/page-title';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';
import { map, filter, mergeMap } from 'rxjs/operators';
import { Chart } from 'chart.js';


import {
  DailypoService,
  GroupReportService,
  GroupUnitService
} from '../../services';

import {
  GroupReport as GroupReportModel,
  GroupUnit as GroupUnitModel
} from '../../models';

import { extend } from 'webdriver-js-extender';

// Dialog service
import { DialogService } from './dialogs/dialog.service';

import { SearchDailyDialogComponent } from './dialogs/search-daily-dialog/search-daily-dialog.component'

@Component({
  selector: 'app-po-daily',
  templateUrl: './po-daily.component.html',
  styleUrls: ['./po-daily.component.scss']
})

export class PoDailyComponent implements OnInit, OnDestroy {

  public loading = false;
  public groupReportModel: GroupReportModel[] = [];
  public groupUnitModel: GroupUnitModel[] = [];

  public ctx: any;
  public myChart: any;
  public label = [];
  public dataSet = [];
  public options: any;
  public titleChart: string;

  // Data table
  // public ELEMENT_DATA: Element[];
  public displayedColumns = ['day'];
  public dataSource;

  constructor(
    public _componentPageTitle: ComponentPageTitle,
    public _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _dailypoService: DailypoService,
    private _dailypoGroupReportService: GroupReportService,
    private _dailypoGroupUnitService: GroupUnitService,
    private _dialogService: DialogService
  ) { }

  public openDialog() {
    this._dialogService
      .searching(this.groupReportModel, this.groupUnitModel)
      .subscribe(res => {
        let date = res['selectedDate'].toISOString();
        let groupCode = res['selectedGroupReport'];
        let unit = res['selectedGroupUnit'];
        this.titleChart = 'Group ${}';
        this.serviceGetGraphProduct(date, groupCode, unit, 'update');
      });
  }

  @ViewChild('barchart') barChart: ElementRef;

  ngOnInit() {
    this._componentPageTitle.title = 'Po. daily report';

    // get Group report service
    this._dailypoGroupReportService.getAll().subscribe(
      res => {
        this.groupReportModel = res;
        const groupCode = this.groupReportModel[0].groupCode;

        // get Group unit service
        this._dailypoGroupUnitService.getByGroupCode(groupCode)
          .subscribe(res => {
            this.groupUnitModel = res;
            const date = (new Date()).toISOString();
            const unit = this.groupUnitModel[0].unitCode;

            // get Graph product service
            this.serviceGetGraphProduct(date, groupCode, unit, 'create');
            // this.createChart();
          });
      });

  }

  ngAfterViewInit() {
    this.ctx = this.barChart.nativeElement.getContext("2d");
  }

  ngOnDestroy() {
    // this.routeParamSubscription.unsubscribe();
  }

  serviceGetGraphProduct(date: string, groupCode: string, unit: string, event: string) {
    this._dailypoService.getGraphProduct(date, groupCode, unit)
      .subscribe(res => {
        this.drawChart(res.body);
        this.drawDataTable(res.body);

        if (event == 'create') {
          this.createChart();
        } else if (event == 'update') {
          this.updateChart();
        }

        setTimeout(() => {
          this.loading = true;
        }, 800)

      }, error => console.error(error));
  }

  drawChart(array) {

    this.dataSet = [];
    this.label = [];
    this.displayedColumns = [];

    let j = 0;
    for (let i = 1; i < 32; i++) {
      this.label.push(i);
      this.displayedColumns.push((j++).toString());
    }

    let color = ['#C5CAE9', '#F8BBD0', '#E57373', '#BBDEFB', '#80CBC4', '#CCFF90', '#FFD180'];
    let gradientFill = this.ctx.createLinearGradient(0, 0, 0, 350);
    gradientFill.addColorStop(0, "rgba(255, 202, 40, 0.6)");
    gradientFill.addColorStop(1, "rgba(255, 202, 250, 0)");

    let product = array.filter(res => { return res.type == "product" });
    let sum = array.filter(res => { return res.type == "sum" });
    let avg = array.filter(res => { return res.type == "avg" });
    let accu = array.filter(res => { return res.type == "accu" });

    avg.map(e => {
      this.dataSet.push({
        label: e.name,
        data: e.unit,
        type: 'line',
        borderWidth: 1.5,
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
        data: e.unit,
        type: 'line',
        lineTension: 0,
        borderWidth: 1.5,
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
        backgroundColor: gradientFill,
      });
    })

    product.map((e, i) => {
      this.dataSet.push({
        label: e.name,
        data: e.unit,
        type: 'bar',
        stack: 'stack',
        fillColor: "#79D1CF",
        strokeColor: "#79D1CF",
        backgroundColor: color[i],
        borderWidth: 1
      });
    })

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
      }
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

  drawDataTable(array) {
    let ELEMENT_DATA: Element[] = array.map(item => {
      return { day: item.name, ...item.unit };
    });

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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






