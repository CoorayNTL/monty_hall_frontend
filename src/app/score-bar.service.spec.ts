import { TestBed } from '@angular/core/testing';

import { ScoreBarService } from './score-bar.service';

describe('ScoreBarService', () => {
  let service: ScoreBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
