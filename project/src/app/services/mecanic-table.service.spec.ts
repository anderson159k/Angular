import { TestBed } from '@angular/core/testing';

import { MecanicTableService } from './mecanic-table.service';

describe('MecanicTableService', () => {
  let service: MecanicTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MecanicTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
