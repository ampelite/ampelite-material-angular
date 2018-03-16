import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDailyTableComponent } from './product-daily-table.component';

describe('ProductDailyTableComponent', () => {
  let component: ProductDailyTableComponent;
  let fixture: ComponentFixture<ProductDailyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDailyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDailyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
