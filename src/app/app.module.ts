import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ComponentPageTitle } from './pages/page-title/page-title';
import { AuthGuard } from './guards/index'
import { AuthenticationService, UserService } from './services/index'

import { MaterialModule } from './modules/material/material.module';

import { NavBar } from './shared/navbar/navbar';
import { DocumentationItems } from './shared/documentation-items/documentation-items';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { PageHeaderComponent } from './pages/page-header/page-header.component';
import { PageViewerComponent } from './pages/page-viewer/page-viewer.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { PoDailyComponent } from './components/po-daily/po-daily.component';
import { MarketingReportComponent } from './components/marketing-report/marketing-report.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    HomepageComponent,
    NavBar,
    SidenavComponent,
    PageHeaderComponent,
    PageViewerComponent,
    SignInComponent,
    PoDailyComponent,
    MarketingReportComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    ComponentPageTitle,
    DocumentationItems,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
