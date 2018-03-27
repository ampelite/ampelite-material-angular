import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { MaterialModule } from '../../modules/material/material.module';
// import { DialogModule } from './dialogs/dialog.module';

// Services
import { DetailDailyService } from './detail-daily/detail-daily.service';
import { DialogService } from './dialogs/dialog.service';

// Components
import { SearchDailyDialogComponent } from './dialogs/search-daily-dialog/search-daily-dialog.component';
import { DetailDailyComponent } from './detail-daily/detail-daily.component';
import { PoDailyComponent } from './po-daily.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    SearchDailyDialogComponent, 
    DetailDailyComponent, 
    PoDailyComponent
  ],
  exports:[
    SearchDailyDialogComponent, 
    DetailDailyComponent, 
    PoDailyComponent
  ],
  entryComponents:[
    SearchDailyDialogComponent, 
    DetailDailyComponent, 
  ],
  providers:[DialogService, DetailDailyService]
})
export class PoDailyModule { }
