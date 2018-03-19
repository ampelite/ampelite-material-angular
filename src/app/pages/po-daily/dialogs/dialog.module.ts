import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../modules/material/material.module'
//service
import { DialogService } from './dialog.service'

//component
import { SearchDailyDialogComponent } from './search-daily-dialog/search-daily-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [SearchDailyDialogComponent],
  exports:[SearchDailyDialogComponent],
  entryComponents:[SearchDailyDialogComponent],
  providers:[DialogService]
})
export class DialogModule { }
