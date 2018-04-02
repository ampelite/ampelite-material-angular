import { TestBed, inject } from '@angular/core/testing';

import { DailyDetailService } from './daily-detail.service';

describe('DailyDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyDetailService]
    });
  });

  it('should be created', inject([DailyDetailService], (service: DailyDetailService) => {
    expect(service).toBeTruthy();
  }));
});
