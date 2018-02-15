import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { DocItem, DocumentationItems, SECTIONS } from '../../shared/documentation-items/documentation-items';
import { ComponentPageTitle } from '../../pages/page-title/page-title';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators/map';

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

  ngOnInit() {
    this._componentPageTitle.title = 'Po. daily report'
  }

  ngOnDestroy() {
    // this.routeParamSubscription.unsubscribe();
  }

}
