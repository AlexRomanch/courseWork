import { TestBed, async, inject } from '@angular/core/testing';

import { StopTestProcessGuard } from './stop-test-process.guard';

describe('StopTestProcessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StopTestProcessGuard]
    });
  });

  it('should ...', inject([StopTestProcessGuard], (guard: StopTestProcessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
