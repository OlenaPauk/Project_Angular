import { TestBed } from '@angular/core/testing';

import { ServiceDetailsService } from './service-details.service';

describe('ServiceDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceDetailsService = TestBed.get(ServiceDetailsService);
    expect(service).toBeTruthy();
  });
});
