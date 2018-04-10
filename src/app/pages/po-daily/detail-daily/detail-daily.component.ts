import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ComponentPageTitle } from '../../page-title';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { DailyDetailService } from '../../../services/daily-po/daily-detail.service';
import { DialogService } from '../dialogs/dialog.service';

import { appConfig } from '../../../app.config';

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
  private totalAmount: string;
  private totalQty: string;

  private paramGroupCode: string;
  private paramTeamName: string;
  private paramSdate: string;

  constructor(
    public _componentPageTitle: ComponentPageTitle,
    private _route: ActivatedRoute,
    private _dailyDetail: DailyDetailService,
    private _dialogService: DialogService
  ) { }

  private loading = false;
  private displayedColumns = ['DocuDate', 'DocuNo', 'CustPONo', 'JobName', 'CustName',
    'GoodName', 'GoodQty', 'GoodPrice2', 'GoodAmnt', 'EmpName'];
  private dataSource: MatTableDataSource<DetailDailyElement>;

  private radioGroup: any[] = [];
  private selectedRadio: string;
  private reportType: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  openDialog() {
    this._dialogService.reporting(this.radioGroup, this.selectedRadio, this.reportType)
      .subscribe(res => {
        if (res == undefined) {
          return false;
        }

        let param = `/PoDaily/Index.aspx?GroupCode=${this.paramGroupCode}`;

        if (res['selectedRadio'] == 'by-customers-order') {
          param += `&TeamName=${this.paramTeamName}`
          param += `&SDate=${this.paramSdate}`
          param += `&ByCustomerOrder=true`;

        } else if (res['selectedRadio'] == 'all-products') {
          param += `&TeamName=all`;
          param += `&SDate=${this.paramSdate}`;
          param += `&ByCustomerOrder=false`;

        } else if (res['selectedRadio'] == 'product') {          
          param += `&TeamName=${this.paramTeamName}`
          param += `&SDate=${this.paramSdate}`
          param += `&ByCustomerOrder=false`;

        }

        param += `&RptType=${res['reportType']}`

        window.open(`${appConfig.reportUrl}${param}`)
      })
  }

  ngOnInit() {

    this._route.queryParams
      .subscribe(param => {
        let sDate = new Date(param.date);
        sDate.setDate(param.sDate);

        this.paramGroupCode = param.groupCode;
        this.paramTeamName = param.teamName;
        this.paramSdate = sDate.toISOString()

        this._componentPageTitle.title = this.paramTeamName;

        this._dailyDetail.getDetailDaily(this.paramGroupCode, this.paramTeamName, sDate.toISOString())
          .subscribe(res => {
            let array = res.body
            this.totalAmount = array.map(p => p.goodAmnt).reduce((accu, curr) => accu + curr);
            this.totalQty = array.map(p => p.goodQty).reduce((accu, curr) => accu + curr);
            this.drawDataTable(res.body);
          });

        if (this.paramGroupCode == 'screw' || this.paramGroupCode == 'fibre') {
          this.radioGroup = [
            {
              value: "by-customers-order",
              text: "ยอดสั่งซื้อ " + this.paramTeamName + " ของลูกค้า"
            },
            {
              value: "all-products",
              text: "ยอดขาย " + this.paramTeamName + " ทั้งหมดต่อวัน"
            },
            {
              value: "product",
              text: "ยอดขาย " + this.paramTeamName
            }
          ]
        }
        else {
          this.radioGroup = [
            {
              value: "product",
              text: "ยอดขาย " + this.paramTeamName
            }
          ]
        }

      });

  }

  ngAfterViewInit() {
    // this.paginator.pageSize = 5;
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

    this.dataSource = new MatTableDataSource<DetailDailyElement>(this.TABLE_DETAIL);
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

