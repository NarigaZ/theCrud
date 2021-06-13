import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {NovoClienteService} from "../novo-cliente/novo-cliente.service";
import {CpfCnpjExisteService} from "../novo-cliente/cpf-cnpj-existe.service";
import {cpfValidator} from "../geral/validators/cpf.validator";
import {cnpjValidator} from "../geral/validators/cnpj.validator";
import {ActivatedRoute} from "@angular/router";
import {Cliente} from "../geral/interfaces/cliente";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  novoClienteForm!: FormGroup;
  cliente: Cliente;


  constructor(private clienteService: NovoClienteService,
              private formBuilder: FormBuilder,
              private cpfCnpjExistente: CpfCnpjExisteService,
              private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.novoClienteForm = this.formBuilder.group({
      id: [''],
      nome: ['',[Validators.required]],
      tipoPessoa: ['FISICA',[Validators.required]],
      cpf: ['',[Validators.required, cpfValidator], [this.cpfCnpjExistente.cpfCnpjJaExiste(id)]],
      cnpj: [''],
      rg: ['',[Validators.required]],
      ie: [''],
      ativo: ['true'],
      ddd: ['',[Validators.minLength(2)]],
      numero: ['',[Validators.minLength(9)]],
      telefones: this.formBuilder.array([])
    });
    this.clienteService.getCliente(id).subscribe((response) =>{
      this.novoClienteForm.get('id').setValue(response.id);
      this.novoClienteForm.get('nome').setValue(response.nome);
      this.novoClienteForm.get('tipoPessoa').setValue(response.tipoPessoa);
      this.novoClienteForm.get('ativo').setValue(response.ativo);
      if (this.novoClienteForm.get('tipoPessoa').value == 'FISICA'){
        this.novoClienteForm.get('cpf').setValue(response.cpfCnpj);
        this.novoClienteForm.get('rg').setValue(response.rgIe);
      } else {
        this.novoClienteForm.get('cnpj').setValue(response.cpfCnpj);
        this.novoClienteForm.get('ie').setValue(response.rgIe);
      }
      this.carregaTelefones(response.telefones);
    })
    this.novoClienteForm.get('tipoPessoa').valueChanges
      .subscribe(value => {
        if(value == "FISICA") {
          this.novoClienteForm.get('cpf').setValidators([Validators.required, cpfValidator]);
          this.novoClienteForm.get('cpf').setAsyncValidators([this.cpfCnpjExistente.cpfCnpjJaExiste(id)]);
          this.novoClienteForm.get('rg').setValidators([Validators.required]);
          this.novoClienteForm.get('cnpj').clearValidators();
          this.novoClienteForm.get('cnpj').clearAsyncValidators();
          this.novoClienteForm.get('ie').clearValidators();
          this.updateCamposValidators();
        } else {
          this.novoClienteForm.get('cnpj').setValidators([Validators.required, cnpjValidator]);
          this.novoClienteForm.get('cnpj').setAsyncValidators([this.cpfCnpjExistente.cpfCnpjJaExiste(id)]);
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
    this.clienteService.alteraCliente(novoCliente).subscribe(() => {
      console.log('Alterado com Sucesso!')
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

  carregaTelefones(clienteTelefones) {
    let telefones = this.novoClienteForm.get('telefones') as FormArray;
    clienteTelefones.forEach(telefone => {
      telefones.push(this.formBuilder.control({'ddd': telefone.ddd,
        'numero': telefone.numero}));
    })
  }

  excluirTelefone(i: number) {
    let telefones = this.novoClienteForm.get('telefones') as FormArray;
    telefones.removeAt(i);
  }
}
