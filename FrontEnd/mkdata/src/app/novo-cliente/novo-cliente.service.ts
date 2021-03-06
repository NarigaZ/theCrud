import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class NovoClienteService {

  baseUrl = environment.baseUrl;

  constructor(private httpCliente: HttpClient) { }

  getClientes(nome, ativo):Observable<any> {
    let params = new HttpParams().set('nome', nome).set("ativo", ativo);
    return this.httpCliente.get( `${this.baseUrl}clientes` , {params: params})
  }

  cadastraCliente(cliente):Observable<any> {
    return this.httpCliente.post(`${this.baseUrl}clientes`, cliente);
  }

  verificaCpfExistente(cpfCnpj: string, id) {
    let params = {};
    if (id){
      params = new HttpParams().set('id', id);
    }
    return this.httpCliente.get(`${this.baseUrl}clientes/cpfCnpjExistente/${cpfCnpj}`, {params: params});
  }

  excluirCliente(id: any):Observable<any> {
    return this.httpCliente.delete(`${this.baseUrl}clientes/${id}`);
  }

  getCliente(id: string):Observable<any> {
    return this.httpCliente.get(`${this.baseUrl}clientes/${id}`);
  }

  alteraCliente(cliente: any):Observable<any> {
    return this.httpCliente.put(`${this.baseUrl}clientes/${cliente.id}`, cliente);
  }
}
