import { Component, OnInit } from '@angular/core';
import { ComponentPageTitle } from '../../pages/page-title/page-title';

@Component({
  selector: 'app-marketing-report',
  templateUrl: './marketing-report.component.html',
  styleUrls: ['./marketing-report.component.scss']
})
export class MarketingReportComponent implements OnInit {

  constructor(public _componentPageTitle: ComponentPageTitle) { }

  ngOnInit() {
    this._componentPageTitle.title = "Marketing report"
  }

}
