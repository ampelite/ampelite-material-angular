import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
// import {DocViewerModule} from '../../shared/doc-viewer/doc-viewer-module';
import { DocItem, DocumentationItems } from '../../shared/documentation-items/documentation-items';
// import {TableOfContentsModule} from '../../shared/table-of-contents/table-of-contents.module';
import { ComponentPageTitle } from '../page-title/page-title';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.scss']
})
export class PageViewerComponent {
  componentDocItem: DocItem;

  sections: Set<string> = new Set(['overview', 'api']);

  constructor(private _route: ActivatedRoute,
    private router: Router,
    public _componentPageTitle: ComponentPageTitle,
    public docItems: DocumentationItems) {
    // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
    // parent route for the section (material/cdk).
    combineLatest(_route.params, _route.parent.params).pipe(
      map((p: [Params, Params]) => ({ id: p[0]['id'], section: p[1]['section'] })),
      map(p => docItems.getItemById(p.id, p.section))).subscribe(d => {
        this.componentDocItem = d;
        if (this.componentDocItem) {
          this._componentPageTitle.title = `${this.componentDocItem.name}`;
          this.componentDocItem.examples.length ?
            this.sections.add('examples') :
            this.sections.delete('examples');

        } else {
          this.router.navigate(['/components']);
        }
      });
  }
}

@NgModule({
  imports: [
    MatTabsModule,
    RouterModule,
    // DocViewerModule,
    CommonModule,
    // TableOfContentsModule,
  ],
  exports: [PageViewerComponent],
  declarations: [PageViewerComponent],
  providers: [DocumentationItems, ComponentPageTitle],
})
export class ComponentViewerModule { }