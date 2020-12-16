import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentconformationComponent } from './appointmentconformation.component';

describe('AppointmentconformationComponent', () => {
  let component: AppointmentconformationComponent;
  let fixture: ComponentFixture<AppointmentconformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentconformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentconformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
