import { PlantsModule } from './plants.module';

describe('PlantsModule', () => {
  let plantsModule: PlantsModule;

  beforeEach(() => {
    plantsModule = new PlantsModule();
  });

  it('should create an instance', () => {
    expect(plantsModule).toBeTruthy();
  });
});
