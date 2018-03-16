import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';

//service
import { DialogService } from './dialog.service'

//component
import { SearchDailyDialogComponent } from './search-daily-dialog/search-daily-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [SearchDailyDialogComponent],
  exports:[SearchDailyDialogComponent],
  entryComponents:[SearchDailyDialogComponent],
  providers:[DialogService]
})
export class DialogModule { }
