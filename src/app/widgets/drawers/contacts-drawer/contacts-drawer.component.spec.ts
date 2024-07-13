import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDrawerComponent } from './contacts-drawer.component';

describe('ContactsDrawerComponent', () => {
  let component: ContactsDrawerComponent;
  let fixture: ComponentFixture<ContactsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
