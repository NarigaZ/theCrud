import { Injectable } from '@angular/core';
import {NovoClienteService} from "./novo-cliente.service";
import {AbstractControl} from "@angular/forms";
import {first, map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CpfCnpjExisteService {

  constructor(private novoClienteService: NovoClienteService) {}

  cpfCnpjJaExiste(id) {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap( (cpfCnpj) => this.novoClienteService.verificaCpfExistente(cpfCnpj, id)
        ),
        map( (cpfCnpjExiste) =>
          cpfCnpjExiste ? { cpfCnpjExistente: true } : null
        ),
        first()
      );
    }
  }
}
