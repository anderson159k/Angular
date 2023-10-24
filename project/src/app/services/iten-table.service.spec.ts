import { TestBed } from '@angular/core/testing';

import { ItenTableService } from './iten-table.service';

describe('ItenTableService', () => {
  let service: ItenTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItenTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
