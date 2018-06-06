import { TestBed, inject } from '@angular/core/testing';

import { CountryInformationService } from './country-information.service';

describe('CountryInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryInformationService]
    });
  });

  it('should be created', inject([CountryInformationService], (service: CountryInformationService) => {
    expect(service).toBeTruthy();
  }));
});
