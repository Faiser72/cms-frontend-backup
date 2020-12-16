import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientreportsComponent } from './patientreports.component';

describe('PatientreportsComponent', () => {
  let component: PatientreportsComponent;
  let fixture: ComponentFixture<PatientreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
