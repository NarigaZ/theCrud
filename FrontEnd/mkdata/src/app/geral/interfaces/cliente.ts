import {Telefone} from "./telefone";

export interface Cliente {
  id:string;
  nome:string;
  tipoPessoa:string;
  cpfCnpj:string;
  rgIe:string;
  ativo:boolean;
  [telefones:number]:Telefone;
}
