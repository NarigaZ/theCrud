import { TestBed } from '@angular/core/testing';

import { NovoClienteService } from './novo-cliente.service';

describe('NovoClienteService', () => {
  let service: NovoClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovoClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
