import { TestBed } from '@angular/core/testing';

import { MasterDetailsService } from './master-details.service';

describe('MasterDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterDetailsService = TestBed.get(MasterDetailsService);
    expect(service).toBeTruthy();
  });
});
