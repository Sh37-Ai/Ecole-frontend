import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTReComponent } from './navigation-tre.component';

describe('NavigationTReComponent', () => {
  let component: NavigationTReComponent;
  let fixture: ComponentFixture<NavigationTReComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationTReComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationTReComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
