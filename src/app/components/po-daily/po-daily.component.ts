import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { DocItem, DocumentationItems, SECTIONS } from '../../shared/documentation-items/documentation-items';
import { ComponentPageTitle } from '../../pages/page-title/page-title';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';
// import { map } from 'rxjs/operators/map';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-po-daily',
  templateUrl: './po-daily.component.html',
  styleUrls: ['./po-daily.component.scss']
})
export class PoDailyComponent implements OnInit, OnDestroy {

  params: Observable<Params>;
  routeParamSubscription: Subscription;
  componentDocItem: DocItem;

  constructor(public docItems: DocumentationItems,
    public _componentPageTitle: ComponentPageTitle,
    private _route: ActivatedRoute) { }

  @ViewChild('myChart') _myChart: ElementRef;
  ngOnInit() {
    this._componentPageTitle.title = 'Po. daily report';

    const label = [];
    for (let i = 1; i < 31; i++) {
      label.push(i);
    }

    const dataset = {
      datasets: [
        {
          label: 'Avg',
          data: [20, 20, 20, 20],
          type: 'line',
          borderColor: 'rgb(255, 202, 40)',
          borderWidth: 1,
          // pointStyle: 'rectRot',
          // pointRadius: 4,
          // hitRadius: 10,
          backgroundColor: 'rgba(255, 202, 40, 0.2)',
          pointBackgroundColor: 'rgb(255, 202, 40)',
          // pointHoverRadius: 10
        }, {
          yAxisID: 'accu',
          label: 'ACCU',
          data: [30, 20, 30, 3],
          type: 'line',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          // pointStyle: 'rectRot',
          // pointRadius: 4,
          // hitRadius: 10,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          // pointHoverRadius: 10
        }, {
          label: 'Ampelite D-lite',
          data: [10, 20, 30, 40],
          type: 'bar',
          fillColor: "#79D1CF",
          strokeColor: "#79D1CF",
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgb(75, 192, 192)',
          stack: 'stack'
        }, {
          label: 'Ampelite Amperam',
          data: [10, 28, 10, 10],
          type: 'bar',
          fillColor: "#79D1CF",
          strokeColor: "#79D1CF",
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgb(255, 99, 132)',
          stack: 'stack'
        },],
      labels: label
    };

    const option = {
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              drawOnChartArea: false,
            },
          }
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              drawOnChartArea: false,
            }
          }, {
            id: 'accu',
            position: 'right',

            gridLines: {
              drawOnChartArea: false,
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
          ctx.fillStyle='rgba(0, 0, 0, 0.87)';

          this.data.datasets.forEach(function (dataset, i) {
            if (dataset.type == 'bar') {
              const meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                const data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            }
          });
        }
      },
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        // display: true,
        // text: 'Custom Chart Title'
      }, tooltips: {
        mode: 'x',
        intersect: true
      }
    };

    Chart.defaults.global.legend.labels.usePointStyle = true;

    const myChart = new Chart(this._myChart.nativeElement, {
      type: 'bar',
      data: dataset,
      options: option,
    });

  }

  ngOnDestroy() {
    // this.routeParamSubscription.unsubscribe();
  }

}
