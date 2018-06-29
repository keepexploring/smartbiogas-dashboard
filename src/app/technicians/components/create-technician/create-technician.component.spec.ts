import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechnicianComponent } from './create-technician.component';

describe('CreateTechnicianComponent', () => {
  let component: CreateTechnicianComponent;
  let fixture: ComponentFixture<CreateTechnicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTechnicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
