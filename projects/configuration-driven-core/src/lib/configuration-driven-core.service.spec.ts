import { TestBed } from '@angular/core/testing';

import { ConfigurationDrivenCoreService } from './configuration-driven-core.service';

describe('ConfigurationDrivenCoreService', () => {
  let service: ConfigurationDrivenCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationDrivenCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
