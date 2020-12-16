import { TestBed } from '@angular/core/testing';

import { FrontdeskService } from './frontdesk.service';

describe('FrontdeskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrontdeskService = TestBed.get(FrontdeskService);
    expect(service).toBeTruthy();
  });
});
