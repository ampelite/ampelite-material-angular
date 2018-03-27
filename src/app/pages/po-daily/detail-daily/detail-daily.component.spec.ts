import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDailyComponent } from './detail-daily.component';

describe('DetailDailyComponent', () => {
  let component: DetailDailyComponent;
  let fixture: ComponentFixture<DetailDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
