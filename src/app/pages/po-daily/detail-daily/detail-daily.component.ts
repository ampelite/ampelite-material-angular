import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ComponentPageTitle } from '../../page-title';

// import {} from '../../../services/daily-po/'

@Component({
  selector: 'app-detail-daily',
  templateUrl: './detail-daily.component.html',
  styleUrls: ['./detail-daily.component.scss']
})
export class DetailDailyComponent implements OnInit {

  public groupCode: string;
  public teamName: string;
  public sDate: Date;

  constructor(
    public _componentPageTitle: ComponentPageTitle
  ) { }

  displayedColumns = ['DocuDate', 'DocuNo', 'CustPONo', 'JobName', 'CustName',
    'GoodName', 'GoodQty2', 'GoodPrice2', 'GoodAmnt', 'EmpName'];
  dataSource = new MatTableDataSource<DetailDailyElement>(TABLE_DETAIL);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this._componentPageTitle.title = "Detail daily";
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface DetailDailyElement {
  DocuDate: string;
  DocuNo: string;
  CustPONo: string;
  JobName: string;
  CustName: string;
  GoodName: string;
  GoodQty2: number;
  GoodPrice2: number;
  GoodAmnt: number;
  EmpName: string;
}

const TABLE_DETAIL: DetailDailyElement[] = [
  { DocuDate: (new Date()).toDateString(), DocuNo: "SO6103-010", CustPONo: "142/61", JobName: "บางพลี โกดัง 3", CustName: "บริษัท พีเอส รูฟ เมทัลชีท จำกัด", GoodName: "Louvre 400 Type II TopLite Plus 1800", GoodQty2: 202, GoodPrice2: 20, GoodAmnt: 301, EmpName: "นางสาว พิมพ์ศิริ วรรณโรจน์" },

];