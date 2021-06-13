import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NovoClienteService {

  constructor(private httpCliente: HttpClient) { }

  getClientes(nome, ativo):Observable<any> {
    let params = new HttpParams().set('nome', nome).set("ativo", ativo);
    return this.httpCliente.get('http://api/clientes', {params: params})
  }

  cadastraCliente(cliente):Observable<any> {
    return this.httpCliente.post('http://api/clientes', cliente);
  }

  verificaCpfExistente(cpfCnpj: string, id) {
    let params = {};
    if (id){
      params = new HttpParams().set('id', id);
    }
    return this.httpCliente.get(`http://api/clientes/cpfCnpjExistente/${cpfCnpj}`, {params: params});
  }

  excluirCliente(id: any):Observable<any> {
    return this.httpCliente.delete(`http://api/clientes/${id}`);
  }

  getCliente(id: string):Observable<any> {
    return this.httpCliente.get(`http://api/clientes/${id}`);
  }

  alteraCliente(cliente: any):Observable<any> {
    return this.httpCliente.put(`http://api/clientes/${cliente.id}`, cliente);
  }
}
