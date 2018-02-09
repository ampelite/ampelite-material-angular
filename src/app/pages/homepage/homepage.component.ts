import { Component, NgModule, OnInit } from '@angular/core';
// import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import { MatButtonModule } from '@angular/material';
// import {FooterModule} from '../../shared/footer/footer';
import { RouterModule } from '@angular/router';
import { ComponentPageTitle } from '../page-title/page-title';
import { SECTIONS } from '../../shared/documentation-items/documentation-items';

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(public _componentPageTitle: ComponentPageTitle) { }

  ngOnInit(): void {
    this._componentPageTitle.title = '';
  }

  get sections() {
    return SECTIONS;
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }
}

@NgModule({
  imports: [MatButtonModule, RouterModule], // SvgViewerModule, FooterModule, 
  exports: [HomepageComponent],
  declarations: [HomepageComponent],
})
export class HomepageModule { }