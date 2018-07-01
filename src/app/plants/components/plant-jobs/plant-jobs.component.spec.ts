import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantJobsComponent } from './plant-jobs.component';

describe('PlantJobsComponent', () => {
  let component: PlantJobsComponent;
  let fixture: ComponentFixture<PlantJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
