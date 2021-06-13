import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NovoClienteComponent} from "./novo-cliente/novo-cliente.component";
import {ListaClienteComponent} from "./lista-cliente/lista-cliente.component";
import {EditarClienteComponent} from "./editar-cliente/editar-cliente.component";


const routes: Routes = [
  {
    path: 'cliente/novo',
    component: NovoClienteComponent
  },
  {
    path: 'cliente/lista',
    component: ListaClienteComponent
  },
  {
    path: 'cliente/:id',
    component: EditarClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
