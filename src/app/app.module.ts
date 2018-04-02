import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/index';
import { MaterialModule } from './modules/material/material.module';

import { NavBar } from './shared/navbar/navbar';
import { DocumentationItems } from './shared/documentation-items/documentation-items';

import { CategoryListComponent } from './pages/category-list/category-list.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ComponentPageTitle } from './pages/page-title/page-title';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { PageHeaderComponent } from './pages/page-header/page-header.component';
import { PageFooterComponent } from './pages/page-footer/page-footer.component';
import { PageViewerComponent } from './pages/page-viewer/page-viewer.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { MarketingReportComponent } from './pages/marketing-report/marketing-report.component';

import {
  AuthenticationService,
  UserService,
  DailypoService,
  DailyDetailService,
  GroupReportService,
  GroupUnitService
} from './services/index';
import { SalePromotionComponent } from './pages/sale-promotion/sale-promotion.component';
import { PoDailyModule } from './pages/po-daily/po-daily.module';

@NgModule({
  entryComponents: [],
  declarations: [
    AppComponent,
    CategoryListComponent,
    HomepageComponent,
    NavBar,
    SidenavComponent,
    PageHeaderComponent,
    PageViewerComponent,
    SignInComponent,
    MarketingReportComponent,
    PageFooterComponent,
    SalePromotionComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    PoDailyModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    DailypoService,
    DailyDetailService,
    GroupReportService,
    GroupUnitService,
    ComponentPageTitle,
    DocumentationItems,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
