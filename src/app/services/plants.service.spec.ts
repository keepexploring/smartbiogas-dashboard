import { TestBed, inject } from '@angular/core/testing';

import { PlantsService } from './plants.service';

describe('PlantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlantsService]
    });
  });

  it('should be created', inject([PlantsService], (service: PlantsService) => {
    expect(service).toBeTruthy();
  }));
});
