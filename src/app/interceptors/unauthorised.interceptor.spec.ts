import { TestBed, inject } from '@angular/core/testing';

import { UnauthorisedService } from './unauthorised.service';

describe('UnauthorisedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthorisedService]
    });
  });

  it('should be created', inject([UnauthorisedService], (service: UnauthorisedService) => {
    expect(service).toBeTruthy();
  }));
});
