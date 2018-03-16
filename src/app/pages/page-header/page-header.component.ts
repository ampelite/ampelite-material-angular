import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { ComponentPageTitle } from '../page-title/page-title';
// import {NavigationFocusModule} from '../../shared/navigation-focus/navigation-focus';
import { MatButtonModule, MatIconModule } from '@angular/material';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  constructor(
    public _componentPageTitle: ComponentPageTitle
  ) { }

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [MatButtonModule, MatIconModule], // , NavigationFocusModule
  exports: [PageHeaderComponent],
  declarations: [PageHeaderComponent],
  providers: [ComponentPageTitle],
})
export class ComponentHeaderModule { }

