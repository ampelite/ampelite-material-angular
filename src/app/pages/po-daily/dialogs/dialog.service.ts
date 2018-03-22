import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

// Components
import { SearchDailyDialogComponent } from './search-daily-dialog/search-daily-dialog.component';
// Models
import { GroupReport as GroupReportModel, GroupUnit as GroupUnitModel } from '../../../models';
// Services 
import { GroupReportService, GroupUnitService } from '../../../services';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog,
    public GroupReportService: GroupReportService,
    public GroupUnitService: GroupUnitService
  ) { }

  public searching(
    GroupReportModel: GroupReportModel[],
    GroupUnitModel: GroupUnitModel[],
    selectedGroupReport: string,
    selectedGroupUnit: string,
    selectedDate: Date): Observable<any[]> {

    let dialogRef: MatDialogRef<SearchDailyDialogComponent>;

    dialogRef = this.dialog.open(SearchDailyDialogComponent, {
      minWidth: '250px',
      maxWidth: '300px',
      data: {
        groupReport: GroupReportModel,
        groupUnit: GroupUnitModel,
        selectedGroupReport,
        selectedGroupUnit,
        selectedDate
      }
    });

    return dialogRef.afterClosed();
  }

}
