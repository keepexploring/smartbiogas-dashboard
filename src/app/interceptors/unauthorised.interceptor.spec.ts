import { TestBed, inject } from '@angular/core/testing';

import { UnauthorisedInterceptor } from './unauthorised.interceptor';

describe('UnauthorisedInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthorisedInterceptor],
    });
  });

  it(
    'should be created',
    inject([UnauthorisedInterceptor], (service: UnauthorisedInterceptor) => {
      expect(service).toBeTruthy();
    }),
  );
});
