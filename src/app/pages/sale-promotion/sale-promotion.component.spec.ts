import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePromotionComponent } from './sale-promotion.component';

describe('SalePromotionComponent', () => {
  let component: SalePromotionComponent;
  let fixture: ComponentFixture<SalePromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
