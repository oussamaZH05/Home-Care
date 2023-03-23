import { TestBed } from '@angular/core/testing';

import { ClientPostService } from './client-post.service';

describe('ClientPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientPostService = TestBed.get(ClientPostService);
    expect(service).toBeTruthy();
  });
});
