import { TestBed } from '@angular/core/testing';

import { MarkService } from './mark.service';

describe('MarkService', () => {
  let service: MarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
