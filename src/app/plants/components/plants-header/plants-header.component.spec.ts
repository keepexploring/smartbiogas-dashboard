import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsHeaderComponent } from './plants-header.component';

describe('PlantsHeaderComponent', () => {
  let component: PlantsHeaderComponent;
  let fixture: ComponentFixture<PlantsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
