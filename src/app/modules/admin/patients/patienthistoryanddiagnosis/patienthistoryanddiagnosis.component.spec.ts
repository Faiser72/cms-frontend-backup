import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatienthistoryanddiagnosisComponent } from './patienthistoryanddiagnosis.component';

describe('PatienthistoryanddiagnosisComponent', () => {
  let component: PatienthistoryanddiagnosisComponent;
  let fixture: ComponentFixture<PatienthistoryanddiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatienthistoryanddiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatienthistoryanddiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
