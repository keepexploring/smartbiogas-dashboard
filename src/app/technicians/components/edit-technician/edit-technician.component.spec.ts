import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechnicianComponent } from './edit-technician.component';

describe('EditTechnicianComponent', () => {
  let component: EditTechnicianComponent;
  let fixture: ComponentFixture<EditTechnicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTechnicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
