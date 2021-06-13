import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { NavigateBarComponent } from './navigate-bar/navigate-bar.component';
import { NovoClienteComponent } from './novo-cliente/novo-cliente.component';
import {GeralModule} from "./geral/geral.module";
import {HttpClientModule} from "@angular/common/http";
import { ListaClienteComponent } from './lista-cliente/lista-cliente.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IConfig, NgxMaskModule} from "ngx-mask";
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    NavigateBarComponent,
    NovoClienteComponent,
    ListaClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule,
    GeralModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
