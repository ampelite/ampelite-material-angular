import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

// Components
import { SearchDailyDialogComponent } from './search-daily-dialog/search-daily-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public searching(title: string, message: string): Observable<string> {
    let dialogRef: MatDialogRef<SearchDailyDialogComponent>;

    dialogRef = this.dialog.open(SearchDailyDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}
