import { TestBed, inject } from '@angular/core/testing';

import { NavigationHistoryService } from './navigation-history.service';

describe('NavigationHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationHistoryService]
    });
  });

  it('should be created', inject([NavigationHistoryService], (service: NavigationHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
