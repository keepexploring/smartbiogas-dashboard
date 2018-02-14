import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsMapComponent } from './plants-map.component';

describe('PlantsMapComponent', () => {
  let component: PlantsMapComponent;
  let fixture: ComponentFixture<PlantsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
