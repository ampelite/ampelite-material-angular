import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-search-daily-dialog',
  templateUrl: './search-daily-dialog.component.html',
  styleUrls: ['./search-daily-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'th' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class SearchDailyDialogComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<SearchDailyDialogComponent>) { }

  ngOnInit() {
  }

}
