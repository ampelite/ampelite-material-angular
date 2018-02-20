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
          backgroundColor: 'rgba(255, 202, 40, 0.4)',
          borderColor: 'rgb(255, 202, 40)'
        }, {
          label: 'Ampelite D-lite',
          data: [10, 20, 30, 40],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgb(75, 192, 192)'
        }, {
          label: 'Ampelite Amperam',
          data: [10, 28, 10, 10],
          type: 'bar',
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgb(255, 99, 132)'
        }, {
          yAxisID: 'accu',
          label: 'ACCU',
          data: [30, 20, 30, 3],
          type: 'line',
          backgroundColor: 'rgba(54, 162, 235, 0.4)',
          borderColor: 'rgb(54, 162, 235)'
        }],
      labels: label
    };

    const option = {
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            stacked: true
          }, {
            id: 'accu',
            position: 'right',
            gridLines: {
              display: false
            }
          }
        ]
      },
      animation: {
        onComplete: function () {
          const chartInstance = this.chart,
            ctx = chartInstance.ctx;

          // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function (dataset, i) {
            const meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
              const data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
            });
          });
        }
      },
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Custom Chart Title'
      }
    };

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
