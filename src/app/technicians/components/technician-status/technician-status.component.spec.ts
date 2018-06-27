import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianStatusComponent } from './technician-status.component';

describe('TechnicianStatusComponent', () => {
  let component: TechnicianStatusComponent;
  let fixture: ComponentFixture<TechnicianStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
