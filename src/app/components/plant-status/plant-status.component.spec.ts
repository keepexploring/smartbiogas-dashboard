import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantStatusComponent } from './plant-status.component';

describe('PlantStatusComponent', () => {
  let component: PlantStatusComponent;
  let fixture: ComponentFixture<PlantStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
