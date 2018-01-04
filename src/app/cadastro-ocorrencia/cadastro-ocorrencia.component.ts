import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs/Observable'

import {OcorrenciasService} from '../shared/services/ocorrencias.service'
import {NotificationService} from '../shared/services/notification.service'
import {SelectOption} from '../shared/select/select-option.model'
import {Ocorrencia, Veiculo, Dp, Proprietario} from '../shared/models/ocorrencia.model'
import {chassisP,numeroCasaP,placaP, anoVeiculoP, numeroOcorrenciaP} from '../shared/text-masks'

@Component({
  selector: 'cav-cadastro-ocorrencia',
  templateUrl: './cadastro-ocorrencia.component.html',
})
export class CadastroOcorrenciaComponent implements OnInit {


  ocorrenciaForm: FormGroup

  placaPattern = [/[A-Z]/i,/[A-Z]/i,/[A-Z]/i,'-',/\d/,/\d/,/\d/,/\d/]

  numeroPattern = numeroCasaP

  chassisPattern = chassisP

  numberPattern = /^[0-9]*$/

  anoveiculoPattern= anoVeiculoP

  numeroOcorrenciaPattern = numeroOcorrenciaP

  constructor(private ocorrenciasService: OcorrenciasService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService) { }

  veiculoOptions: SelectOption[]=[
    {option: 'Carro', value: 'CARRO'},
    {option: 'Moto', value: 'MOTO'},
    {option: 'Triciculo', value: 'TRICICULO'},
    {option: 'Outros', value: 'OUTROS'}
  ]

  dpOptions: SelectOption[] = [ ]

  ocorrenciaOptions: SelectOption[] = [
    {option: 'Roubo', value: 'ROUBO'},
    {option: 'Furto', value: 'FURTO'},
  ]


  ngOnInit() {
    this.ocorrenciaForm = this.formBuilder.group({
      numeroOcorrencia: this.formBuilder.control('', [Validators.maxLength(50)]),
      local: this.formBuilder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(450)]),
      observacoes: this.formBuilder.control('', [Validators.maxLength(450)]),
      placa: this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      anoVeiculo: this.formBuilder.control('', [Validators.maxLength(4)]),
      chassis: this.formBuilder.control('', [Validators.maxLength(17)]),
      numeroMotor: this.formBuilder.control('', [Validators.maxLength(15)]),
      cor: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      tipoVeiculo: this.formBuilder.control('', [Validators.required]),
      nomeProprietario: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(450)]),
      contatoProprietario: this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      dp: this.formBuilder.control('', [Validators.required]),
      tipoOcorrencia: this.formBuilder.control('', [Validators.required]),
      data: this.formBuilder.control('', [Validators.required]),
    })
    this.ocorrenciasService.getAllDps().subscribe(dps => {
      dps.map(dp => {
        this.dpOptions.push(new SelectOption(dp.nome, dp.public_id))
      })
    })
  }

registraOcorrencia(values){
  let dp: Dp = new Dp(values.dp, 'null');
  let proprietario: Proprietario = new Proprietario(values.nomeProprietario, values.contatoProprietario)
  let veiculo: Veiculo = new  Veiculo(
    values.placa, values.tipoVeiculo,
    proprietario,values.chassis,
    values.numeroMotor,values.anoVeiculo,
    values.cor);
  let ocorrencia: Ocorrencia = new Ocorrencia(
    values.local,
    values.numeroOcorrencia,
    dp,
    values.tipoOcorrencia,
    values.situacao,
    veiculo,
    values.data,
    values.observacoes
  )
  console.log(values)
  console.log(ocorrencia)
  this.ocorrenciasService.registraProprietario(ocorrencia.veiculo.proprietario).subscribe(result =>{
    ocorrencia.veiculo.proprietario.public_id=result
    this.ocorrenciasService.registraVeiculo(ocorrencia.veiculo).subscribe(result => {
      ocorrencia.veiculo.public_id=result
      this.ocorrenciasService.registraOcorrencia(ocorrencia).subscribe(message => {
        console.log(message)
        this.notificationService.notify('Ocorrência Registrada!')
        this.ocorrenciaForm.reset()
      })
    })
  })
  // this.ocorrenciasService.registraVeiculo(ocorrencia.veiculo).subscribe(result => {
  //   ocorrencia.veiculo.public_id=result
  //   this.ocorrenciasService.registraOcorrencia(ocorrencia).subscribe(message => {
  //     console.log(message)
  //     this.notificationService.notify('Ocorrência Registrada!')
  //     this.ocorrenciaForm.reset()
  //   })
  // })
}

testaServico(){
  let ocorrencias = {}
  this.ocorrenciasService.getTwoOcorrencias('d8c6b91a-4895-4795-9069-899c3b381ea2','088222c2-4712-4c31-bbb8-6b005563aed3').subscribe(
    data => {
      this.notificationService.notify('Ocorrência Registrada!')
      console.log(ocorrencias)
    }
  )
}



}
