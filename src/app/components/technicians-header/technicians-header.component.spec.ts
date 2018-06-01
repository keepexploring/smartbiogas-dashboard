import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniciansHeaderComponent } from './technicians-header.component';

describe('TechniciansHeaderComponent', () => {
  let component: TechniciansHeaderComponent;
  let fixture: ComponentFixture<TechniciansHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniciansHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniciansHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
