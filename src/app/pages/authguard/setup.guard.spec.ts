import { TestBed, async, inject } from '@angular/core/testing';

import { SetupGuard } from './setup.guard';

describe('SetupGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetupGuard]
    });
  });

  it('should ...', inject([SetupGuard], (guard: SetupGuard) => {
    expect(guard).toBeTruthy();
  }));
});
