import { TestBed } from '@angular/core/testing';

import { PiFormsService } from './pi-forms.service';

describe('PiFormsService', () => {
  let service: PiFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
