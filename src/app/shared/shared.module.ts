import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { OcorrenciasService } from './services/ocorrencias.service';
import { NotificationService} from './services/notification.service';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component'
import { SelectComponent } from './select/select.component';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';


@NgModule({
  declarations: [InputComponent, RadioComponent, SelectComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, CommonModule, FormsModule, ReactiveFormsModule, SelectComponent, SnackbarComponent]
})
export class SharedModule{
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [OcorrenciasService, NotificationService],

    }
  }
}
