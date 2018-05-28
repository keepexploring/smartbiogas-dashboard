import { TestBed, inject } from '@angular/core/testing';

import { ConnectionStatusService } from './connection-status.service';

describe('ConnectionStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionStatusService]
    });
  });

  it('should be created', inject([ConnectionStatusService], (service: ConnectionStatusService) => {
    expect(service).toBeTruthy();
  }));
});
