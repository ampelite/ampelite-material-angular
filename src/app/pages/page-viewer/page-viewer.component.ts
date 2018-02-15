import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { DocItem, DocumentationItems } from '../../shared/documentation-items/documentation-items';
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

  // sections: Set<string> = new Set(['overview']);

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
          // this.router.navigate(['/components', this.componentDocItem.id]);
          // this.router.navigate([`/components/${this.componentDocItem.id}/${this.componentDocItem.component}`]);
          // this.componentDocItem.examples.length ?
          //   this.sections.add('examples') :
          //   this.sections.delete('examples');

        } else {
          this.router.navigate(['/components']);
        }
      });
  }
}

@Component({
  selector: 'component-overview',
  templateUrl: './page-overview.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ComponentOverview implements OnInit {
  @ViewChild('intialFocusTarget') focusTarget: ElementRef;

  constructor(public PageViewerComponent: PageViewerComponent) { }

  ngOnInit() {
    // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
    setTimeout(() => this.focusTarget.nativeElement.focus(), 100);
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
  exports: [PageViewerComponent, ComponentOverview],
  declarations: [PageViewerComponent, ComponentOverview],
  providers: [DocumentationItems, ComponentPageTitle],
})
export class ComponentViewerModule { }