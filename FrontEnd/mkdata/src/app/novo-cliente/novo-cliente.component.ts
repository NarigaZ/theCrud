import {Component, OnInit} from '@angular/core';
import {NovoClienteService} from "./novo-cliente.service";
import {FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {cpfValidator} from "../geral/validators/cpf.validator";
import {cnpjValidator} from "../geral/validators/cnpj.validator";
import {CpfCnpjExisteService} from "./cpf-cnpj-existe.service";

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {

  novoClienteForm!: FormGroup;

  constructor(private clienteService: NovoClienteService,
              private formBuilder: FormBuilder,
              private cpfCnpjExistente: CpfCnpjExisteService) {
  }

  ngOnInit(): void {
    this.novoClienteForm = this.formBuilder.group({
      nome: ['',[Validators.required]],
      tipoPessoa: ['FISICA',[Validators.required]],
      cpf: ['',[Validators.required, cpfValidator], [this.cpfCnpjExistente.cpfCnpjJaExiste(null)]],
      cnpj: [''],
      rg: ['',[Validators.required]],
      ie: [''],
      ddd: ['',[Validators.minLength(2)]],
      numero: ['',[Validators.minLength(9)]],
      telefones: this.formBuilder.array([])
    });
    this.novoClienteForm.get('tipoPessoa').valueChanges
      .subscribe(value => {
        if(value == "FISICA") {
          this.novoClienteForm.get('cpf').setValidators([Validators.required, cpfValidator]);
          this.novoClienteForm.get('cpf').setAsyncValidators([this.cpfCnpjExistente.cpfCnpjJaExiste(null)]);
          this.novoClienteForm.get('rg').setValidators([Validators.required]);
          this.novoClienteForm.get('cnpj').clearValidators();
          this.novoClienteForm.get('cnpj').clearAsyncValidators();
          this.novoClienteForm.get('ie').clearValidators();
          this.updateCamposValidators();
        } else {
          this.novoClienteForm.get('cnpj').setValidators([Validators.required, cnpjValidator]);
          this.novoClienteForm.get('cnpj').setAsyncValidators([this.cpfCnpjExistente.cpfCnpjJaExiste(null)]);
          this.novoClienteForm.get('ie').setValidators([Validators.required]);
          this.novoClienteForm.get('cpf').clearValidators();
          this.novoClienteForm.get('cpf').clearAsyncValidators();
          this.novoClienteForm.get('rg').clearValidators();
          this.updateCamposValidators();
        }
      });
  }
  updateCamposValidators() {
    this.novoClienteForm.get('cpf').updateValueAndValidity();
    this.novoClienteForm.get('rg').updateValueAndValidity();
    this.novoClienteForm.get('cnpj').updateValueAndValidity();
    this.novoClienteForm.get('ie').updateValueAndValidity();
  }

  getFormValidationErrors() {
    Object.keys(this.novoClienteForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.novoClienteForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  cadastrar() {
    this.getFormValidationErrors();
    const novoCliente = this.novoClienteForm.getRawValue();

    if (novoCliente.tipoPessoa == 'FISICA') {
      novoCliente.cpfCnpj = novoCliente.cpf;
      novoCliente.rgIe = novoCliente.rg;
    } else {
      novoCliente.cpfCnpj = novoCliente.cnpj
      novoCliente.rgIe = novoCliente.ie
    }
    this.clienteService.cadastraCliente(novoCliente).subscribe(() => {
      console.log('Cadastrado')
    }, (error) => {
      alert("Erro");
    });
  }

  validaTelefone(){
    return this.novoClienteForm.get("ddd").invalid || this.novoClienteForm.get("numero").invalid
    || (this.novoClienteForm.get("ddd").value?.length == 0 || this.novoClienteForm.get("numero").value?.length == 0)
  }

  addTelefone() {
    let telefones = this.novoClienteForm.get('telefones') as FormArray;
      telefones.push(this.formBuilder.control({'ddd': this.novoClienteForm.get("ddd")?.value,
        'numero': this.novoClienteForm.get("numero")?.value}));
    this.novoClienteForm.get("ddd")?.setValue("");
    this.novoClienteForm.get("numero")?.setValue("");
  }
  excluirTelefone(i: number) {
    let telefones = this.novoClienteForm.get('telefones') as FormArray;
    telefones.removeAt(i);
  }
}
