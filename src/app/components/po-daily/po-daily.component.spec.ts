import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoDailyComponent } from './po-daily.component';

describe('PoDailyComponent', () => {
  let component: PoDailyComponent;
  let fixture: ComponentFixture<PoDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
