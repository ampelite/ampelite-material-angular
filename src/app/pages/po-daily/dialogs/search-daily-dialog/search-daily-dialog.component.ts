import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatDatepicker, MatOption, MAT_DIALOG_DATA } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { map, filter } from 'rxjs/operators';
// Models
import { GroupReport as GroupReportModel, GroupUnit as GroupUnitModel } from '../../../../models';
// Services 
import { GroupReportService, GroupUnitService } from '../../../../services';

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
export class SearchDailyDialogComponent {

  public date: Date;
  public selectedGroupReport: string;
  public selectedGroupUnit: string;
  public groupReport: GroupReportModel[];
  public groupUnit: GroupUnitModel[];

  constructor(
    public dialogRef: MatDialogRef<SearchDailyDialogComponent>,
    private GroupReportService: GroupReportService,
    private GroupUnitService: GroupUnitService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  //  groupReportChange() {
  //   let groupCode = this.data.selectedGroupReport;
  //   this.GroupUnitService.getByGroupCode(groupCode)
  //     .subscribe(res => {
  //       this.groupUnit = res;
  //       this.data.groupUnit = res;
  //       this.data.selectedGroupUnit = res[0].unitCode;
  //     })
  // }

}
