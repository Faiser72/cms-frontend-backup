import { TestBed } from '@angular/core/testing';

import { DoctorrolemasterserviceService } from './doctorrolemasterservice.service';

describe('DoctorrolemasterserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorrolemasterserviceService = TestBed.get(DoctorrolemasterserviceService);
    expect(service).toBeTruthy();
  });
});
