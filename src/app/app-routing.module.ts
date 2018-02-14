import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';
import { PageViewerComponent } from './pages/page-viewer/page-viewer.component'
import { SignInComponent } from './pages/sign-in/sign-in.component'
import { AuthGuard } from './guards'

const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full', data: {}, canActivate: [AuthGuard] },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'categories', redirectTo: '/components/categories' },
  { path: 'guide/cdk-table', redirectTo: '/cdk/table/overview' },
  // {path: 'guide/:id', component: GuideViewer, data: {}},
  {
    path: ':section',
    // canActivate: [CanActivateComponentSidenav],
    component: SidenavComponent,
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      { path: '  component/:id', redirectTo: ':id', pathMatch: 'full' },
      { path: 'category/:id', redirectTo: '/categories/:id', pathMatch: 'full' },
      {
        path: 'categories',
        children: [
          { path: '', component: CategoryListComponent, canActivate: [AuthGuard] },
          // {path: ':id', component: ComponentList},
        ],
      },
      {
        path: ':id',
        component: PageViewerComponent,
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          // { path: 'overview', component: ComponentOverview, pathMatch: 'full' },
          // { path: 'api', component: ComponentApi, pathMatch: 'full' },
          // { path: 'examples', component: ComponentExamples, pathMatch: 'full' },
          // { path: '**', redirectTo: 'overview' },
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
