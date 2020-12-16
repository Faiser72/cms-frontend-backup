import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsappointmentdashboardComponent } from './doctorsappointmentdashboard.component';

describe('DoctorsappointmentdashboardComponent', () => {
  let component: DoctorsappointmentdashboardComponent;
  let fixture: ComponentFixture<DoctorsappointmentdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsappointmentdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsappointmentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
