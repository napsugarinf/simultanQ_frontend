import { TestBed } from '@angular/core/testing';

import { PlayquizService } from './playquiz.service';

describe('PlayquizService', () => {
  let service: PlayquizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayquizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
