import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modules
import { MaterialModule } from '../../modules/material/material.module';
// import { DialogModule } from './dialogs/dialog.module';

// Services
import { DialogService } from './dialogs';

// Components
import { SearchDailyDialogComponent, ReportsDialogComponent } from './dialogs';
import { DetailDailyComponent } from './detail-daily/detail-daily.component';
import { PoDailyComponent } from './po-daily.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    SearchDailyDialogComponent, 
    DetailDailyComponent, 
    PoDailyComponent, 
    ReportsDialogComponent
  ],
  exports:[
    SearchDailyDialogComponent, 
    ReportsDialogComponent,
    DetailDailyComponent, 
    PoDailyComponent
  ],
  entryComponents:[
    SearchDailyDialogComponent, 
    ReportsDialogComponent,
    DetailDailyComponent, 
  ],
  providers:[DialogService]
})
export class PoDailyModule { }
