import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormDebugComponent} from "./form-debug/form-debug.component";
import {CommonModule} from "@angular/common";
import { MensagemComponent } from './mensagem/mensagem.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    MensagemComponent,
  ],
  exports: [
    FormDebugComponent,
    MensagemComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class GeralModule {

}
