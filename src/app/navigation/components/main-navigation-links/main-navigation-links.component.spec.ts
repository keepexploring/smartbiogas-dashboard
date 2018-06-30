import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavigationLinksComponent } from './main-navigation-links.component';

describe('MainNavigationLinksComponent', () => {
  let component: MainNavigationLinksComponent;
  let fixture: ComponentFixture<MainNavigationLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNavigationLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavigationLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
