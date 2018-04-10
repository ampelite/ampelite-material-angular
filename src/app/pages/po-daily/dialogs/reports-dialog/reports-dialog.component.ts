import { Component, OnInit, Inject } from '@angular/core';
import { MatDatepickerInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GroupReportService, GroupUnitService } from '../../../../services';

@Component({
  selector: 'app-reports-dialog',
  templateUrl: './reports-dialog.component.html',
  styleUrls: ['./reports-dialog.component.scss']
})
export class ReportsDialogComponent implements OnInit {

  selectedRadio: string;
  reportType: string;

  constructor(
    public dialogRef: MatDialogRef<ReportsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  exportPdf(){
    this.data.reportType= 'pdf';
    this.dialogRef.close(this.data);
  }

  exportExcel(){
    this.data.reportType = 'excel';
    this.dialogRef.close(this.data);
  }

}
