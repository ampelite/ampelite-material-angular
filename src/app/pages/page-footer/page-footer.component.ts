import { Component, OnInit, NgModule } from '@angular/core';
import {VERSION} from '@angular/material';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})

export class PageFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }

get version() {
    const version = VERSION.full.match(/\d+\.\d+\.\d+/);
    if (version) {
      return version[0];
    }
    return '';
  }
}
