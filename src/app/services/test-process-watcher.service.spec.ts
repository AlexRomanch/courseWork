import { TestBed, inject } from '@angular/core/testing';

import { TestProcessWatcherService } from './test-process-watcher.service';

describe('TestProcessWatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestProcessWatcherService]
    });
  });

  it('should be created', inject([TestProcessWatcherService], (service: TestProcessWatcherService) => {
    expect(service).toBeTruthy();
  }));
});
