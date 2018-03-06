import { TestBed, inject } from '@angular/core/testing';

import { DailypoService } from './dailypo.service';

describe('DailypoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailypoService]
    });
  });

  it('should be created', inject([DailypoService], (service: DailypoService) => {
    expect(service).toBeTruthy();
  }));
});
