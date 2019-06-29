import { TestBed } from '@angular/core/testing';

import { LinkChangesService } from './link-changes.service';

describe('LinkChangesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkChangesService = TestBed.get(LinkChangesService);
    expect(service).toBeTruthy();
  });
});
