import { TestBed } from '@angular/core/testing';

import { LabtestService } from './labtest.service';

describe('LabtestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LabtestService = TestBed.get(LabtestService);
    expect(service).toBeTruthy();
  });
});
