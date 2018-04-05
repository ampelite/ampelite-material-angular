import { Component, OnInit, Inject } from '@angular/core';
import { MatDatepickerInputEvent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GroupReportService, GroupUnitService } from '../../../../services';

@Component({
  selector: 'app-reports-dialog',
  templateUrl: './reports-dialog.component.html',
  styleUrls: ['./reports-dialog.component.scss']
})
export class ReportsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportsDialogComponent>,
    private GroupReportService: GroupReportService,
    private GroupUnitService: GroupUnitService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.data.selectedDate = event.value;
  }

}
