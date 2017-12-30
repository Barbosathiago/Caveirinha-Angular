import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {OcorrenciasService} from '../shared/services/ocorrencias.service'
import {SelectOption} from '../shared/select/select-option.model'
import {Ocorrencia, Veiculo, Dp} from '../shared/models/ocorrencia.model'

@Component({
  selector: 'cav-cadastro-ocorrencia',
  templateUrl: './cadastro-ocorrencia.component.html',
})
export class CadastroOcorrenciaComponent implements OnInit {

  ocorrenciaForm: FormGroup

  numberPattern = /^[0-9]*$/

  constructor(private ocorrenciasService: OcorrenciasService,
              private formBuilder: FormBuilder) { }

  veiculoOptions: SelectOption[]=[
    {option: 'Carro', value: 'CARRO'},
    {option: 'Moto', value: 'MOTO'},
    {option: 'Triciculo', value: 'TRICICULO'},
    {option: 'Outros', value: 'OUTROS'}
  ]

  dpOptions: SelectOption[] = [
    {option: '1º DP', value: '1º DP'},
    {option: '2º DP', value: '2º DP'},
    {option: '3º DP', value: '3º DP'},
    {option: '4º DP', value: '4º DP'},
  ]

  ocorrenciaOptions: SelectOption[] = [
    {option: 'Roubo', value: 'ROUBO'},
    {option: 'Furto', value: 'FURTO'},
  ]


  ngOnInit() {
    this.ocorrenciaForm = this.formBuilder.group({
      rua: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      numero: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(250), Validators.pattern(this.numberPattern)]),
      placa: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      chassis: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
      numeroMotor: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      cor: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      tipoVeiculo: this.formBuilder.control('', [Validators.required]),
      descricao: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(450)]),
      nomeProprietario: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(450)]),
      telefoneProprietario: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      dp: this.formBuilder.control('', [Validators.required]),
      tipoOcorrencia: this.formBuilder.control('', [Validators.required]),
    })
  }

registraOcorrencia(values){
  let dp: Dp = new Dp(null ,values.dp);
  let veiculo: Veiculo = new  Veiculo(null, values.placa,
    values.chassis, values.numeroMotor, values.cor,
    values.tipoVeiculo, values.descricao, values.nomeProprietario,
    values.telefoneProprietario);
  let ocorrencia: Ocorrencia = new Ocorrencia(null
    ,values.rua, values.bairro,
    values.numero,dp, values.tipoOcorrencia,
    null, veiculo
  )
  console.log(ocorrencia)
  this.ocorrenciasService.registraOcorrencia(ocorrencia).subscribe((message: string) => {
    console.log(message)
  })
}



}
