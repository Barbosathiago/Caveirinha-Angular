import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import {SelectComponent} from '../shared/select/select.component';
import {Observable} from 'rxjs/Observable';

import {OcorrenciasService} from '../shared/services/ocorrencias.service';
import {NotificationService} from '../shared/services/notification.service';
import {SelectOption} from '../shared/select/select-option.model';
import {Ocorrencia, Veiculo, Dp, Proprietario, Tipo} from '../shared/models/ocorrencia.model';
import {chassisP,numeroCasaP,placaP, anoVeiculoP, numeroOcorrenciaP} from '../shared/text-masks';

@Component({
  selector: 'cav-cadastro-ocorrencia',
  templateUrl: './cadastro-ocorrencia.component.html',
})
export class CadastroOcorrenciaComponent implements OnInit {

  @ViewChild('dpselect') dpSelect: SelectComponent;
  @ViewChild('tipoocorrenciaselect') tipoSelect: SelectComponent;


  placaPattern = [/[A-Z]/i, /[A-Z]/i, /[A-Z]/i, '-', /\d/, /\d/, /\d/, /\d/];

  numeroPattern = numeroCasaP;

  chassisPattern = chassisP;

  numberPattern = /^[0-9]*$/;

  anoveiculoPattern= anoVeiculoP;

  numeroOcorrenciaPattern = numeroOcorrenciaP;

  veiculoOptions: SelectOption[]= [
    {option: 'Carro', value: 'CARRO'},
    {option: 'Moto', value: 'MOTO'},
    {option: 'Triciculo', value: 'TRICICULO'},
    {option: 'Outros', value: 'OUTROS'}
  ];

  dpOptions: SelectOption[] = [ ];

  ocorrenciaOptions: SelectOption[] = [];

  text: string;

  results: Proprietario[];

  ocorrenciaForm: FormGroup;
  nomeProp: FormControl;
  contatoProp: FormControl;
  numeroOcorrenciaProp: FormControl;
  localOcorrenciaProp: FormControl;
  observacoesProp: FormControl;
  placaProp: FormControl;
  anoVeiculoProp: FormControl;
  chassisProp: FormControl;
  numeroMotorProp: FormControl;
  corProp: FormControl;
  tipoVeiculoProp: FormControl;
  dpProp: FormControl;
  tipoOcorrenciaProp: FormControl;
  dataProp: FormControl;


  selectedProp: Proprietario = null;

  constructor(private ocorrenciasService: OcorrenciasService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService) {}


  setValues(ocorrencia: Ocorrencia) {
    this.contatoProp.setValue(ocorrencia.veiculo.proprietario.contato);
    this.nomeProp.setValue(ocorrencia.veiculo.proprietario.nome);
    this.numeroOcorrenciaProp.setValue(ocorrencia.numeroOcorrencia);
    this.localOcorrenciaProp.setValue(ocorrencia.localOcorrencia);
    this.observacoesProp.setValue(ocorrencia.observacoes);
    this.placaProp.setValue(ocorrencia.veiculo.placa);
    this.anoVeiculoProp.setValue(ocorrencia.veiculo.ano);
    this.chassisProp.setValue(ocorrencia.veiculo.chassis);
    this.numeroMotorProp.setValue(ocorrencia.veiculo.chassis);
    this.corProp.setValue(ocorrencia.veiculo.cor);
    this.tipoVeiculoProp.setValue(ocorrencia.veiculo.tipo);
    this.dpProp.setValue(ocorrencia.dp.id);
    this.tipoOcorrenciaProp.setValue(ocorrencia.tipo);
    this.dataProp.setValue(ocorrencia.data);
  }


  ngOnInit() {
    this.contatoProp = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]);
    this.nomeProp = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(450)]);
    this.numeroOcorrenciaProp = this.formBuilder.control('', [Validators.maxLength(50)]);
    this.localOcorrenciaProp = this.formBuilder.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(450)]);
    this.observacoesProp = this.formBuilder.control('', [Validators.maxLength(450)]);
    this.placaProp = this.formBuilder.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    this.anoVeiculoProp = this.formBuilder.control('', [Validators.maxLength(4)]);
    this.chassisProp = this.formBuilder.control('', [Validators.maxLength(17)]);
    this.numeroMotorProp = this.formBuilder.control('', [Validators.maxLength(15)]);
    this.corProp = this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.tipoVeiculoProp = this.formBuilder.control('', [Validators.required]);
    this.dpProp = this.formBuilder.control('', [Validators.required]);
    this.tipoOcorrenciaProp = this.formBuilder.control('', [Validators.required]);
    this.dataProp = this.formBuilder.control('', [Validators.required]);
    this.ocorrenciaForm = this.formBuilder.group({
      nomeProprietario: this.nomeProp,
      contatoProprietario: this.contatoProp,
      numeroOcorrencia: this.numeroOcorrenciaProp,
      local: this.localOcorrenciaProp,
      observacoes: this.observacoesProp,
      placa: this.placaProp,
      anoVeiculo: this.anoVeiculoProp,
      chassis: this.chassisProp,
      numeroMotor: this.numeroMotorProp,
      cor: this.corProp,
      tipoVeiculo: this.tipoVeiculoProp,
      dp: this.dpProp,
      tipoOcorrencia: this.tipoOcorrenciaProp,
      data: this.dataProp
    });
    this.ocorrenciasService.getAllDps().subscribe(dps => {
      dps.map(dp => {
        this.dpOptions.push(new SelectOption(dp.nome, dp.id));
      });
      this.dpSelect.setValue(this.dpOptions[0].value);
    });
    this.ocorrenciasService.getAllTipos().subscribe(tipos => {
      tipos.map(tipo => {
        this.ocorrenciaOptions.push(new SelectOption(tipo.descricao, tipo.id));
      });
      this.tipoSelect.setValue(this.ocorrenciaOptions[0].value);
    });
    this.nomeProp.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap(searchTerm => this.ocorrenciasService.getProprietario(searchTerm)
    .catch(error => Observable.from([])))
    .subscribe(proprietarios => {
      this.results = proprietarios;
      console.log(this.results);
    });


  }
  setProprietario(event) {
    console.log(event);
    this.contatoProp.setValue(event.contato);
    this.selectedProp = new Proprietario();
    this.selectedProp.nome = event.nome;
    this.selectedProp.contato = event.contato;
    this.selectedProp.id = event.public_id;
    this.nomeProp.disable();
    this.contatoProp.disable();
  }

  clearProprietario() {
    this.selectedProp = null;
    this.nomeProp.enable();
    this.contatoProp.enable();
    this.contatoProp.reset();
  }

  registraOcorrencia(values) {
    const dp: Dp = new Dp();
    dp.id = values.dp;


    let proprietario: Proprietario = new Proprietario();
    if (!this.selectedProp) {
      proprietario.nome = values.nomeProprietario;
      proprietario.contato = values.contatoProprietario;
    } else {
      proprietario = this.selectedProp;
    }

    const veiculo: Veiculo = new Veiculo();
    veiculo.ano = values.anoVeiculo;
    veiculo.chassis = values.chassis;
    veiculo.cor = values.cor;
    veiculo.numeroMotor = values.numeroMotor;
    veiculo.placa = values.placa;
    veiculo.proprietario = proprietario;
    veiculo.tipo = values.tipoVeiculo;


    const ocorrencia: Ocorrencia = new Ocorrencia();
    ocorrencia.localOcorrencia = values.local;
    ocorrencia.numeroOcorrencia = values.numeroOcorrencia;
    ocorrencia.dp_id = values.dp;
    ocorrencia.tipo_id = values.tipoOcorrencia;
    ocorrencia.situacao = values.situacao;
    ocorrencia.veiculo_id = values.veiculo;
    ocorrencia.data = values.data;
    ocorrencia.observacoes = values.observacoes;
    ocorrencia.veiculo = veiculo;
    ocorrencia.dp = dp;
    ocorrencia.situacao = 'PENDENTE';

    console.log(values);
    console.log(ocorrencia);
    if(this.selectedProp) {
      this.ocorrenciasService.registraVeiculo(ocorrencia.veiculo).subscribe(result => {
        ocorrencia.veiculo_id = result;
        this.ocorrenciasService.registraOcorrencia(ocorrencia).subscribe(message => {
          console.log(message);
          this.notificationService.notify('Ocorrência Registrada!');
          this.ocorrenciaForm.reset();
          this.clearProprietario();
        });
      });
    } else {
        this.ocorrenciasService.registraProprietario(ocorrencia.veiculo.proprietario).subscribe(result => {
          ocorrencia.veiculo.proprietario_id = result;
          this.ocorrenciasService.registraVeiculo(ocorrencia.veiculo).subscribe( id => {
            ocorrencia.veiculo_id = id;
            this.ocorrenciasService.registraOcorrencia(ocorrencia).subscribe(message => {
              console.log(message);
              this.notificationService.notify('Ocorrência Registrada!');
              this.ocorrenciaForm.reset();
              this.clearProprietario();
            });
          });
        });
      }
    }

  testaServico() {
    const ocorrencias = {};
    this.ocorrenciasService.getTwoOcorrencias('d8c6b91a-4895-4795-9069-899c3b381ea2', '088222c2-4712-4c31-bbb8-6b005563aed3').subscribe(
      data => {
        this.notificationService.notify('Ocorrência Registrada!');
        console.log(ocorrencias);
      }
    );
  }
}
