import { TestBed } from '@angular/core/testing';

import { CargarimagenesServiceService } from './cargarimagenes-service.service';

describe('CargarimagenesServiceService', () => {
  let service: CargarimagenesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarimagenesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
