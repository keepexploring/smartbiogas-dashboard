import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPlantsTableComponent } from './main-plants-table.component';

describe('MainPlantsTableComponent', () => {
  let component: MainPlantsTableComponent;
  let fixture: ComponentFixture<MainPlantsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPlantsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPlantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
