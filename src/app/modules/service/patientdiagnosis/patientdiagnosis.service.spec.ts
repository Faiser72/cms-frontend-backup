import { TestBed } from '@angular/core/testing';

import { PatientdiagnosisService } from './patientdiagnosis.service';

describe('PatientdiagnosisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientdiagnosisService = TestBed.get(PatientdiagnosisService);
    expect(service).toBeTruthy();
  });
});
