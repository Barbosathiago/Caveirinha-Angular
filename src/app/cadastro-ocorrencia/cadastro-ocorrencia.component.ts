import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {OcorrenciasService} from '../shared/services/ocorrencias.service'

@Component({
  selector: 'cav-cadastro-ocorrencia',
  templateUrl: './cadastro-ocorrencia.component.html',
})
export class CadastroOcorrenciaComponent implements OnInit {

  ocorrenciaForm: FormGroup

  numberPattern = /^[0-9]*$/

  constructor(private context: OcorrenciasService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ocorrenciaForm = this.formBuilder.group({
      rua: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      numero: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(250), Validators.pattern(this.numberPattern)]),
      placa: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      chassis: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
      numeroMotor: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      cor: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      tipoVeiculo: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(450)]),
      nomeProprietario: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(450)]),
      telefoneProprietario: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      dp: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
      tipoOcorrencia: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    })
  }

}
