import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCallingCodeDropdownComponent } from './country-calling-code-dropdown.component';

describe('CountryCallingCodeDropdownComponent', () => {
  let component: CountryCallingCodeDropdownComponent;
  let fixture: ComponentFixture<CountryCallingCodeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCallingCodeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCallingCodeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
