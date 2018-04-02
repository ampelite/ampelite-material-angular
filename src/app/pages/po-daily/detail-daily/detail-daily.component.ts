import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ComponentPageTitle } from '../../page-title';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { DailyDetailService } from '../../../services/daily-po/daily-detail.service';

@Component({
  selector: 'app-detail-daily',
  templateUrl: './detail-daily.component.html',
  styleUrls: ['./detail-daily.component.scss']
})
export class DetailDailyComponent implements OnInit {

  public groupCode: string;
  public teamName: string;
  public sDate: Date;

  private TABLE_DETAIL: DetailDailyElement[];

  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private _route: ActivatedRoute,
    private _dailyDetail: DailyDetailService,
  ) { }

  private loading = false;
  private displayedColumns = ['DocuDate', 'DocuNo', 'CustPONo', 'JobName', 'CustName',
    'GoodName', 'GoodQty', 'GoodPrice2', 'GoodAmnt', 'EmpName'];
  private dataSource: MatTableDataSource<DetailDailyElement>;
  // = new MatTableDataSource<DetailDailyElement>(this.TABLE_DETAIL);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this._route.queryParams
      .subscribe(param => {
        let sDate = new Date(param.date);
        sDate.setDate(param.sDate);

        this._componentPageTitle.title = param.teamName;

        this._dailyDetail.getDetailDaily(param.groupCode, param.teamName, sDate.toISOString())
          .subscribe(res => {
            this.drawDataTable(res.body);
          });
      });

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  private drawDataTable(data) {
    this.TABLE_DETAIL = data.map(p => {
      return {
        DocuDate: p.docuDate,
        DocuNo: p.docuNo,
        CustPONo: p.custPONo,
        JobName: p.jobName,
        CustName: p.custName,
        GoodName: p.goodName,
        GoodQty: p.goodQty,
        GoodPrice2: p.goodPrice2,
        GoodAmnt: p.goodAmnt,
        EmpName: p.empName
      };
    });

   this.dataSource =  new MatTableDataSource<DetailDailyElement>(this.TABLE_DETAIL);
   this.dataSource.paginator = this.paginator;
   this.loading = true;
  }

}

export interface DetailDailyElement {
  DocuDate: string;
  DocuNo: string;
  CustPONo: string;
  JobName: string;
  CustName: string;
  GoodName: string;
  GoodQty: number;
  GoodPrice2: number;
  GoodAmnt: number;
  EmpName: string;
}

