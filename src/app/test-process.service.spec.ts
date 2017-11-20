import { TestBed, inject } from '@angular/core/testing';

import { TestProcessService } from './test-process.service';

describe('TestProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestProcessService]
    });
  });

  it('should be created', inject([TestProcessService], (service: TestProcessService) => {
    expect(service).toBeTruthy();
  }));
});
