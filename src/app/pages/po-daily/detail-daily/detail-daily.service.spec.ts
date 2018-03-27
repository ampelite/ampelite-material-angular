import { TestBed, inject } from '@angular/core/testing';

import { DetailDailyService } from './detail-daily.service';

describe('DetailDailyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailDailyService]
    });
  });

  it('should be created', inject([DetailDailyService], (service: DetailDailyService) => {
    expect(service).toBeTruthy();
  }));
});
