import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { OcorrenciasService } from '../shared/services/ocorrencias.service'
import {Ocorrencia} from '../shared/models/ocorrencia.model'
import { DataTableDirective } from 'angular-datatables';
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


  constructor(private ocorrenciasService: OcorrenciasService, private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  openModalWithComponent(ocorrencia: Ocorrencia) {
  this.modalRef = this.modalService.show(EdicaoOcorrenciaComponent, this.config);
  this.modalRef.content.editMode = true;
  this.modalRef.content.initializeInEditMode(ocorrencia);
}

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.dtTrigger.next()
  }

  pesquisarOcorrencias(placa, motor, chassis){
    if (!this.searched) {
      this.searched = true
    }
    this.ocorrenciasService.ocorrencias(placa, motor, chassis, '').subscribe(result => {
      this.ocorrencias = result['ocorrencias']
      this.rerender()
    })


  }

  concluirOcorrencia(ocorrencia, action: string){
    let idOcorrencia = ocorrencia.public_id
    this.ocorrenciasService.ocorrenciasById(idOcorrencia).subscribe(result => {
      result = result['ocorrencia']
      result.situacao = action === 'C'? 'CONCLUÍDA': 'PENDENTE'
      this.ocorrenciasService.updateOcorrencia(idOcorrencia, result).subscribe(response => {
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
