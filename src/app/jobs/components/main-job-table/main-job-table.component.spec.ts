import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainJobTableComponent } from './main-job-table.component';

describe('MainJobTableComponent', () => {
  let component: MainJobTableComponent;
  let fixture: ComponentFixture<MainJobTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainJobTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainJobTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
