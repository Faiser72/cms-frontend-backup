import { TestBed } from '@angular/core/testing';

import { TestreportService } from './testreport.service';

describe('TestreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestreportService = TestBed.get(TestreportService);
    expect(service).toBeTruthy();
  });
});
