import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { PageViewerComponent } from './pages/page-viewer/page-viewer.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { PoDailyComponent } from './pages/po-daily/po-daily.component';
import { MarketingReportComponent } from './pages/marketing-report/marketing-report.component';
import { SalePromotionComponent } from './pages/sale-promotion/sale-promotion.component';
import { AuthGuard } from './guards';

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full', data: {}, canActivate: [AuthGuard] },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'categories', redirectTo: '/components/categories' },
  { path: 'po-daily', redirectTo: '/components/po-daily' },
  { path: 'marketing-report', redirectTo: '/components/marketing-report' },
  {
    path: ':section',
    // canActivate: [CanActivateComponentSidenav],
    component: SidenavComponent,
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      {
        path: 'categories',
        children: [
          { path: '', component: CategoryListComponent, canActivate: [AuthGuard] },
        ],
      },
      {
        path: 'po-daily',
        children: [
          { path: '', component: PoDailyComponent, canActivate: [AuthGuard] },
        ],
      },
      {
        path: 'marketing-report',
        children: [
          { path: '', component: MarketingReportComponent, canActivate: [AuthGuard] },
        ],
      },
      {
        path: 'sale-promotion',
        children: [
          { path: '', component: SalePromotionComponent, canActivate: [AuthGuard] },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// export const MATERIAL_DOCS_ROUTES: Routes = [
//   {path: '', component: Homepage, pathMatch: 'full', data: {}},
//   {path: 'categories', redirectTo: '/components/categories'},
//   {path: 'guides', component: GuideList, data: {}},
//   // Since https://github.com/angular/material2/pull/9574, the cdk-table guide became the overview
//   // document for the cdk table. To avoid any dead / broken links, we redirect to the new location.
//   {path: 'guide/cdk-table', redirectTo: '/cdk/table/overview'},
//   {path: 'guide/:id', component: GuideViewer, data: {}},
//   {
//     path: ':section',
//     canActivate: [CanActivateComponentSidenav],
//     component: ComponentSidenav,
//     children: [
//       {path: '', redirectTo: 'categories', pathMatch: 'full'},
//       {path: 'component/:id', redirectTo: ':id', pathMatch: 'full'},
//       {path: 'category/:id', redirectTo: '/categories/:id', pathMatch: 'full'},
//       {
//         path: 'categories',
//         children: [
//           {path: '', component: ComponentCategoryList},
//           {path: ':id', component: ComponentList},
//         ],
//       },
//       {
//         path: ':id',
//         component: ComponentViewer,
//         children: [
//           {path: '', redirectTo: 'overview', pathMatch: 'full'},
//           {path: 'overview', component: ComponentOverview, pathMatch: 'full'},
//           {path: 'api', component: ComponentApi, pathMatch: 'full'},
//           {path: 'examples', component: ComponentExamples, pathMatch: 'full'},
//           {path: '**', redirectTo: 'overview'},
//         ],
//       },
//     ],
//   },
//   {path: '**', redirectTo: ''},
// ];
