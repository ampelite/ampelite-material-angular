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

    const data = {
      datasets: [{
        label: 'Ampelite D-lite',
        data: [10, 20, 30, 40],
        // backgroundColor: 'rgba(66, 165, 245, 0.6)'
      }, {
        label: 'Ampelite Amperam',
        data: [10, 20, 30, 40],
        type: 'bar',
        // backgroundColor: "rgba(102, 187, 106, 0.6)"
      }, {
        label: 'Avg',
        data: [14, 53, 40, 20],
        type: 'line',
        backgroundColor: 'rgba(255, 202, 40, 0.4)',
        borderColor: 'rgb(255, 202, 40)'
      }, {
        label: 'ACCU',
        data: [10, 20, 30, 40],
        type: 'line',
        backgroundColor: 'rgba(236, 64, 122, 0.4)',
        borderColor: 'rgb(236, 64, 122)'
      }],
      labels: ['January', 'February', 'March', 'April']
    };

    const option = {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };

    const myChart = new Chart(this._myChart.nativeElement, {
      type: 'bar',
      data: data,
      options: option
    });
  }

  ngOnDestroy() {
    // this.routeParamSubscription.unsubscribe();
  }

}
