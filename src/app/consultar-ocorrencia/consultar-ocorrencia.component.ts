import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms'
import { OcorrenciasService } from '../shared/services/ocorrencias.service'
import {Ocorrencia} from '../shared/models/ocorrencia.model'
import { DataTableDirective } from 'angular-datatables';
import {SelectComponent} from '../shared/select/select.component'
import {SelectOption} from '../shared/select/select-option.model'

import { Subject } from 'rxjs/Subject';
import {EdicaoOcorrenciaComponent} from '../edicao-ocorrencia/edicao-ocorrencia.component'


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'cav-consultar-ocorrencia',
  templateUrl: './consultar-ocorrencia.component.html',
})
export class ConsultarOcorrenciaComponent implements OnInit, AfterViewInit {

  modalRef: BsModalRef;

  @ViewChild('dpselect') dpSelect: SelectComponent
  @ViewChild('tipoocorrenciaselect') tipoSelect: SelectComponent
  @ViewChild('situacaoselect') situacaoSelect: SelectComponent

  // DataTable properties
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  // Component Properties
  ocorrencias = []
  searched: boolean = false

  config = {
  class: 'modal-lg'
  };

  dpOptions: SelectOption[] = [ ]

  ocorrenciaOptions: SelectOption[] = [
    {option: 'Todos', value: ''},
    {option: 'Roubo', value: 'ROUBO'},
    {option: 'Furto', value: 'FURTO'}
  ]

  situacaoOptions: SelectOption[] = [
    {option: 'Todos', value: ''},
    {option: 'PENDENTE', value: 'PENDENTE'},
    {option: 'CONCLUIDA', value: 'CONCLUIDA'},
  ]

  searchForm: FormGroup


  constructor(private ocorrenciasService: OcorrenciasService, private modalService: BsModalService, private formBuilder: FormBuilder) { }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  openModalWithComponent(ocorrencia: Ocorrencia) {
  this.modalRef = this.modalService.show(EdicaoOcorrenciaComponent, this.config);
  this.modalRef.content.editMode = true;
  this.modalRef.content.initializeInEditMode(ocorrencia);
}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      local: this.formBuilder.control(''),
      placa: this.formBuilder.control(''),
      chassis: this.formBuilder.control(''),
      numeroMotor: this.formBuilder.control(''),
      nomeProp: this.formBuilder.control(''),
      numeroOcorrencia: this.formBuilder.control(''),
      dp: this.formBuilder.control(''),
      tipoOcorrencia: this.formBuilder.control(''),
      dataInicial: this.formBuilder.control(''),
      dataFinal: this.formBuilder.control(''),
      situacao: this.formBuilder.control('')
    })
    this.ocorrenciasService.getAllDps().subscribe(dps => {
      this.dpOptions.push(new SelectOption('Todos', ''))
      dps.map(dp => {
        this.dpOptions.push(new SelectOption(dp.nome, dp.id))
      })
      this.dpSelect.setValue('')
      this.situacaoSelect.setValue('')
      this.tipoSelect.setValue(this.ocorrenciaOptions[0].value)
    })

  }

  ngAfterViewInit(){
    this.dtTrigger.next()
  }

  pesquisarOcorrencias(values){
    console.log(values)
    let local = values.local
    let placa = values.placa
    let chassis = values.chassis
    let numeroMotor = values.numeroMotor
    let nomeProp = values.nomeProp
    let numeroOcorrencia = values.numeroOcorrencia
    let dp = values.dp
    let tipoOcorrencia = values.tipoOcorrencia
    let dataInicial = values.dataInicial
    let dataFinal = values.dataFinal
    let situacao = values.situacao
    console.log(dp)


  if (!this.searched) {
     this.searched = true
   }
   this.ocorrenciasService.ocorrencias(local, placa,chassis,numeroMotor,nomeProp, numeroOcorrencia, dp, tipoOcorrencia, dataInicial, dataFinal, situacao).subscribe(result => {
     this.ocorrencias = result['ocorrencias']
     this.rerender()
   }
   )
  }

  concluirOcorrencia(ocorrencia, action: string){
    this.ocorrenciasService.ocorrenciasById(ocorrencia.id).subscribe(result => {
      console.log(result)
      result.situacao = action === 'C'? 'CONCLUÍDA': 'PENDENTE'
      result.dp_id = result.dp.id
      result.veiculo_id = result.veiculo.id
      this.ocorrenciasService.updateOcorrencia(result).subscribe(response => {
        console.log()
        this.ocorrencias[this.ocorrencias.indexOf(ocorrencia)] = result
        this.rerender()

      })
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
