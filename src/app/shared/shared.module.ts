import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {OcorrenciasService} from './services/ocorrencias.service';
import { InputComponent } from './input/input.component'

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule{
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [OcorrenciasService],

    }
  }
}
