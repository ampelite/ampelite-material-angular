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
import { map, filter } from 'rxjs/operators';
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

import { parseDate } from '../../services/date-th'
import { MaterialModule } from '../../modules/material/material.module';
import { extend } from 'webdriver-js-extender';

// Dialog service
import { DialogService } from './dialogs/dialog.service';

let groupReportModel: GroupReportModel[] = [];
let groupUnitModel: GroupUnitModel[] = [];

@Component({
  selector: 'app-po-daily',
  templateUrl: './po-daily.component.html',
  styleUrls: ['./po-daily.component.scss']
})

export class PoDailyComponent implements OnInit, OnDestroy {

  // public _data = [];
  public loading = false;
  // public params: Observable<Params>;
  // public routeParamSubscription: Subscription;

  // Data table
  public ELEMENT_DATA: Element[];
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

  public result: any;
  public openDialog() {
    this._dialogService
      .searching('Confirm Dialog', 'Are you sure you want to do this?')
      .subscribe(() => {
        const date = (new Date()).toISOString();
        this.serviceGetGraphProduct(date, 'fibre', 'km', true);
      });
  }

  @ViewChild('barchart') barchart: ElementRef;

  ngOnInit() {
    this._componentPageTitle.title = 'Po. daily report';

    // get Group report service
    this._dailypoGroupReportService.getAll()
      .subscribe(res => {
        groupReportModel = res;
        const groupCode = groupReportModel[0].groupCode;

        // get Group unit service
        this._dailypoGroupUnitService.getByGroupCode(groupCode)
          .subscribe(res => {
            groupUnitModel = res;
            const date = (new Date()).toISOString();
            const unit = groupUnitModel[0].unitCode;

            // get Graph product service
            this.serviceGetGraphProduct(date, groupCode, unit, true);

          });
      });
  }

  ngOnDestroy() {
    // this.routeParamSubscription.unsubscribe();
  }

  serviceGetGraphProduct(date: string, groupCode: string, unit: string, isDrawTable: boolean) {
    this._dailypoService.getGraphProduct(date, groupCode, unit)
      .subscribe(res => {
        this.drawChart(res.body);

        isDrawTable && this.drawDataTable(res.body);

        setTimeout(() => {
          this.loading = true;
        }, 800)

      }, error => console.error(error));
  }

  drawChart(array) {
    // const array = this.graphProductArray;

    let label = [];
    const data = [];
    let j = 0;
    for (let i = 1; i < 32; i++) {
      label.push(i);
      this.displayedColumns.push((j++).toString());
    }

    const product = array.filter(res => { return res.type == "product" });
    const sum = array.filter(res => { return res.type == "sum" });
    const avg = array.filter(res => { return res.type == "avg" });
    const accu = array.filter(res => { return res.type == "accu" });

    const ctx = this.barchart.nativeElement.getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientStroke.addColorStop(0, '#f49080');
    // gradientStroke.addColorStop(1, '#80b6f4');
    const white = '#fff';

    const gradientFill = ctx.createLinearGradient(0, 0, 0, 350);
    gradientFill.addColorStop(0, "rgba(255, 202, 40, 0.6)");
    gradientFill.addColorStop(1, "rgba(255, 202, 250, 0)");

    const dataSet = [];

    avg.map(e => {
      dataSet.push({
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
      dataSet.push({
        yAxisID: e.type,
        label: e.name,
        data: e.unit,
        type: 'line',
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

    product.map(e => {
      let r = Math.floor(Math.random() * 255) + 100;
      let g = Math.floor(Math.random() * 255) + 135;
      let b = Math.floor(Math.random() * 255) + 60;

      dataSet.push({
        label: e.name,
        data: e.unit,
        type: 'bar',
        stack: 'stack',
        fillColor: "#79D1CF",
        strokeColor: "#79D1CF",
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.8)`,
        // borderColor: white,
        borderWidth: 1
      });
    })

    const dataset = {
      datasets: dataSet,
      labels: label
    };

    const option = {
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              color: white,
              drawOnChartArea: false,
            },
            ticks: {
              fontColor: white
            }
          }
        ],
        yAxes: [
          {
            stacked: true,

            gridLines: {
              drawTicks: true,
              zeroLineColor: white
              // drawOnChartArea: false,              
              // color: white,
            },
            ticks: {
              fontColor: white,
              padding: 5
            }
          }
          , {
            id: 'accu',
            position: 'right',
            gridLines: {
              color: white,
              drawOnChartArea: false,
            },
            ticks: {
              fontColor: white,
              padding: 5
            }
          }
        ]
      },
      animation: {
        onComplete: function () {
          const chartInstance = this.chart,
            ctx = chartInstance.ctx;

          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillStyle = 'rgba(0, 0, 0, 0.87)';

          // this.data.datasets.forEach(function (dataset, i) {
          //   if (dataset.type == 'bar') {
          //     const meta = chartInstance.controller.getDatasetMeta(i);
          //     meta.data.forEach(function (bar, index) {
          //       const data = dataset.data[index];
          //       ctx.fillText(data, bar._model.x, bar._model.y - 5);
          //     });
          //   }
          // });
        }
      },
      legend: {
        display: true,
        fontColor: white,
        labels: {
          fontColor: white
        }
        // position: 'bottom',
      },
      title: {
        display: true,
        text: 'Custom Chart Title',
        fontColor: white,
      },
      tooltips: {
        mode: 'x',
        intersect: true
      }
    };

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: dataset,
      options: option,
    });
  }

  drawDataTable(array) {

    this.ELEMENT_DATA = array.map(item => {
      return { day: item.name, ...item.unit };
    });

    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  // openDialog(): void {
  //   let dialogRef = this._dialog.open(PoDailyOverviewDialog, {
  //     minWidth: '250px',
  //     maxWidth: '300px',
  //     data: {
  //       groupReport: groupReportModel,
  //       groupUnit: groupUnitModel,
  //       selectedDate: new FormControl(new Date()),
  //       selectedGroupReport: groupReportModel[0].groupCode,
  //       selectedGroupUnit: groupUnitModel[0].unitCode,
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }
}

// @Component({
//   selector: 'app-po-daily-dialog',
//   templateUrl: 'po-daily.component.dialog.html',
//   styleUrls: ['po-daily.component.scss'],

//   providers: [
//     { provide: MAT_DATE_LOCALE, useValue: 'th' },
//     { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
//     { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
//   ]
// })

// export class PoDailyOverviewDialog {

//   constructor(
//     public dialogRef: MatDialogRef<PoDailyOverviewDialog>,
//     private _dailypoGroupUnitService: GroupUnitService,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) { }

//   @Output() viewChart = new EventEmitter();

//   groupReportChange() {
//     let groupCode = this.data.selectedGroupReport;
//     this._dailypoGroupUnitService.getByGroupCode(groupCode)
//       .subscribe(res => {
//         groupUnitModel = res;
//         this.data.groupUnit = groupUnitModel;
//         this.data.selectedGroupUnit = groupUnitModel[0].unitCode;
//       })
//   }


//   onViewChart(){
//     const groupCode = this.data.selectedGroupReport;
//     const unitCode = this.data.selectedGroupUnit;
//     const date = this.data.selectedDate.value.toISOString();
//     const obj = { groupCode, unitCode, date}
//     this.viewChart.emit(obj);
//   }

//   onNoClick(): void {
//     // this.dialogRef.close();
//     console.log(this.data.selectedGroupReport);
//   }
// }

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






