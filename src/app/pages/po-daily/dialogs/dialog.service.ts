import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

// Components
import { SearchDailyDialogComponent } from './search-daily-dialog/search-daily-dialog.component';
// Models
import { GroupReport as GroupReportModel, GroupUnit as GroupUnitModel } from '../../../models';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  public searching(
    GroupReportModel: GroupReportModel[],
    GroupUnitModel: GroupUnitModel[],
    selectedGroupReport: string,
    selectedGroupUnit: string,
    selectedDate: Date,
    selectedWeek: number): Observable<boolean> {

    let dialogRef: MatDialogRef<SearchDailyDialogComponent>;

    dialogRef = this.dialog.open(SearchDailyDialogComponent, {
      minWidth: '250px',
      maxWidth: '300px',
      data: {
        groupReport: GroupReportModel,
        groupUnit: GroupUnitModel,
        selectedGroupReport: selectedGroupReport,
        selectedGroupUnit: selectedGroupUnit,
        selectedDate: selectedDate,
        selectedWeek: selectedWeek.toString()
      }
    });

    return dialogRef.afterClosed();
  }

}
