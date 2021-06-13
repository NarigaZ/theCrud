import { Component, OnInit } from '@angular/core';
import {NovoClienteService} from "../novo-cliente/novo-cliente.service";

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styleUrls: ['./lista-cliente.component.css']
})
export class ListaClienteComponent implements OnInit {

  clientes = [];
  nome = '';
  ativo = '';

  constructor(private clienteService: NovoClienteService) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.clienteService.getClientes(this.nome, this.ativo).subscribe((response) => {
      this.clientes = response.content;
    }, error => {
      alert("Lista não Carregada!")
    })
  }

  limparFiltros() {
    this.nome = '';
    this.ativo = '';
  }

  excluirCliente(id: any) {
    this.clienteService.excluirCliente(id).subscribe(() => {
      this.pesquisar();
    },(error => {
      alert("Erro ao excluir cliente!");
    }))
  }
}
