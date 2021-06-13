import { TestBed } from '@angular/core/testing';

import { CpfCnpjExisteService } from './cpf-cnpj-existe.service';

describe('CpfCnpjExisteService', () => {
  let service: CpfCnpjExisteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpfCnpjExisteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
