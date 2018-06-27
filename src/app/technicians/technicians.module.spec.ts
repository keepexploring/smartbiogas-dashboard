import { TechniciansModule } from './technicians.module';

describe('TechniciansModule', () => {
  let techniciansModule: TechniciansModule;

  beforeEach(() => {
    techniciansModule = new TechniciansModule();
  });

  it('should create an instance', () => {
    expect(techniciansModule).toBeTruthy();
  });
});
