import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatButtonModule, MatIconModule } from '@angular/material';
// import { DocItem, DocumentationItems, SECTIONS } from '../../shared/documentation-items/documentation-items';
import { ComponentPageTitle } from '../../pages/page-title/page-title';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';
import { map, filter } from 'rxjs/operators';
import { Chart } from 'chart.js';

import { DailypoService } from '../../services'

@Component({
  selector: 'app-po-daily',
  templateUrl: './po-daily.component.html',
  styleUrls: ['./po-daily.component.scss']
})

export class PoDailyComponent implements OnInit, OnDestroy {

  params: Observable<Params>;
  routeParamSubscription: Subscription;
  // componentDocItem: DocItem;

  animal: string;
  name: string;

  constructor(
    // public docItems: DocumentationItems,
    public _componentPageTitle: ComponentPageTitle,
    public _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _dailypoService: DailypoService) { }

  @ViewChild('barchart') barchart: ElementRef;

  ngOnInit() {
    this._componentPageTitle.title = 'Po. daily report';

    this._dailypoService.getAll()
      .subscribe(res => {
        this.drawChart(res.body);
        return res.body;
      }, error => console.error(error));
  }

  ngOnDestroy() {
    // this.routeParamSubscription.unsubscribe();
  }

  drawChart(array) {
    const label = [];
    const data = [];
    for (let i = 1; i < 32; i++) {
      label.push(i);
    }

    const product = array.filter(res => { return res.type == "product" });
    const sum = array.filter(res => { return res.type == "sum" });
    const avg = array.filter(res => { return res.type == "avg" });
    const accu = array.filter(res => { return res.type == "accu" });

    const dataSet = [];

    const ctx = this.barchart.nativeElement.getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientStroke.addColorStop(0, '#f49080');
    // gradientStroke.addColorStop(1, '#80b6f4');
    const white = '#fff';

    const gradientFill = ctx.createLinearGradient(0, 0, 0, 350);
    gradientFill.addColorStop(0, "rgba(255, 202, 40, 0.6)");
    gradientFill.addColorStop(1, "rgba(255, 202, 250, 0)");

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
              drawTicks:true,
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

    myChart.getContext('2d');

  }

  openDialog(): void {
    let dialogRef = this._dialog.open(PoDailyOverviewDialog, {
      width: '300px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

@Component({
  selector: 'po-daily.component.dialog',
  templateUrl: 'po-daily.component.dialog.html',
})
export class PoDailyOverviewDialog {

  constructor(
    public dialogRef: MatDialogRef<PoDailyOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



