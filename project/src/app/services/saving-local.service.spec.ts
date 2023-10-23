import { TestBed } from '@angular/core/testing';

import { SavingLocalService } from './saving-local.service';

describe('SavingLocalService', () => {
  let service: SavingLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
