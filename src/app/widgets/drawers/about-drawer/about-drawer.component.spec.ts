import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDrawerComponent } from './about-drawer.component';

describe('AboutDrawerComponent', () => {
  let component: AboutDrawerComponent;
  let fixture: ComponentFixture<AboutDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
