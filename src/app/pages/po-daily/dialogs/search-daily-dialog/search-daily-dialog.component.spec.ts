import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDailyDialogComponent } from './search-daily-dialog.component';

describe('SearchDailyDialogComponent', () => {
  let component: SearchDailyDialogComponent;
  let fixture: ComponentFixture<SearchDailyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDailyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDailyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
